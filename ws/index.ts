import WebSocket, { WebSocketServer } from "ws";
import http, { IncomingMessage } from "http";
import { Socket } from 'net';
import { Buffer } from 'buffer';
import cookie from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { send } from "process";
import { saveMessageToDB } from "./lib/db";
import { CustomWebsocket } from "./lib/types";
import { getExpiryInMinutes, refreshToken, waitForRefreshToComplete } from "./lib/auth";

dotenv.config();
const ws = new WebSocketServer({ noServer:true });
const server = http.createServer();
const socketList: Record<string,CustomWebsocket> = {};

server.on("upgrade", (req:IncomingMessage, socket:Socket, head:Buffer) => {
    try {
        console.log("upgrade server");
        if(req.headers.origin !== "http://localhost:3000" || !req.headers.cookie) {
            throw new Error("Cors error or cookie is missing");
        }
        const cookie = req.headers.cookie;
        let index = cookie.indexOf("accessToken=");
        index = index + 12;
        let token = "";
        while(index<cookie.length && cookie[index] !== ";" && cookie[index] !== " ") {
            token = token + cookie[index];
            index++;
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string, (err,decoded:any) => {
            if(err) {
                console.log(err);
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy();
                return;
            }
            ws.handleUpgrade(req,socket,head, (wss:CustomWebsocket) => {
                const {email} = decoded;
                const exp = decoded.exp; //in sec
                wss.id = email;
                wss.accessToken = token;
                wss.expiresIn = exp;
                wss.refreshInProgress = false;
                wss.lastChecked = Date.now();
                socketList[email] = wss;
                ws.emit("connection",wss,req);
            })
        })
    } catch (error) {
        console.log(error);
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
    }
})

ws.on("connection", async (socket:CustomWebsocket) => {
    socket.on("error", console.error);
    socket.on("message", async(payload) => {
        try {
            if(!socket.id || !socket.accessToken || !socket.expiresIn || !socket.lastChecked) return; //destroy socket
            const data = JSON.parse(payload.toString());
            if(data.type === "token-refreshed") {
                socket.emit("refreshedToken",data.token);
                return;
            }
            if(socket.refreshInProgress) {
                await waitForRefreshToComplete(socket);
            }
            if(!socket.refreshInProgress && getExpiryInMinutes(socket.accessToken)<5) {
                socket.refreshInProgress = true;
                socket.send(JSON.stringify({
                    message: "refresh-token"
                }))
                const newToken = await refreshToken(socket);
                socket.accessToken = newToken;
                socket.refreshInProgress = false;
            }
            if(socket.accessToken && data.type === "text-message") {
                const {receiverEmail,text,senderId,receiverId,senderEmail} = data;
                const receiverSocket = socketList[receiverEmail];
                const obj = {text,senderId,receiverId,senderEmail};
                saveMessageToDB(obj,socket.accessToken).catch(err => {
                    console.log("Error for saveMessageToDB()");
                });

                if(socket && socket.readyState === WebSocket.OPEN) {
                    console.log("Sender")
                    socket.send(JSON.stringify({ type: "text-message",...obj}));
                }
                if(receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
                    console.log("receiver")
                    receiverSocket.send(JSON.stringify({type: "text-message",...obj}));
                }
            }
        } catch (error) {
            if(error === "Token refresh failed") {
                socket.close();
                return;
            }
            console.log(error);
        }
    })
    socket.on("close", async() => {
        console.log("socket closed")
        if(socket.id && socketList[socket.id]){
            delete socketList[socket.id];
        }
    })
})


server.listen(8080);