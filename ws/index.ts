import WebSocket, { WebSocketServer } from "ws";
import http, { IncomingMessage } from "http";
import { Socket } from 'net';
import { Buffer } from 'buffer';
import cookie from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { send } from "process";
import { saveMessageToDB } from "./lib/db";

dotenv.config();
const ws = new WebSocketServer({ noServer:true });
const server = http.createServer();
const socketList: Record<string,CustomWebsocket> = {};

interface CustomWebsocket extends WebSocket {
    id?: string;
    accessToken?: string
}
interface socketListType {
    [email:string]: CustomWebsocket;
}

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
                wss.id = email;
                wss.accessToken = token;
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

ws.on("connection", (socket:CustomWebsocket) => {
    socket.on("error", console.error);
    socket.on("message", async(payload) => {
        try {
            const data = JSON.parse(payload.toString());
            if(data.type === "text-message") {
                const socketId = socket.id;
                const {receiverEmail,text,senderId,receiverId,senderEmail} = data;
                if(!socketId) return;
                const senderSocket = socketList[socketId];
                const receiverSocket = socketList[receiverEmail];
                const obj = {text,senderId,receiverId,senderEmail};
                // save mssg to DB
                saveMessageToDB(obj,socket.accessToken).catch(err => {
                    console.log("Error for saveMessageToDB()");
                    socket.close();
                    if(socket.id && socketList[socket.id]){
                        delete socketList[socket.id];
                    }
                });

                if(senderSocket && senderSocket.readyState === WebSocket.OPEN) {
                    senderSocket.send(JSON.stringify({ type: "text-message",...obj}));
                }
                if(receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
                    receiverSocket.send(JSON.stringify({type: "text-message",...obj}));
                }
            }
        } catch (error) {
            console.log("caught savedb error")
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