"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importStar(require("ws"));
const http_1 = __importDefault(require("http"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./lib/db");
const auth_1 = require("./lib/auth");
dotenv_1.default.config();
const ws = new ws_1.WebSocketServer({ noServer: true });
const server = http_1.default.createServer();
const socketList = {};
server.on("upgrade", (req, socket, head) => {
    try {
        console.log("upgrade server");
        if (req.headers.origin !== "http://localhost:3000" || !req.headers.cookie) {
            throw new Error("Cors error or cookie is missing");
        }
        const cookie = req.headers.cookie;
        let index = cookie.indexOf("accessToken=");
        index = index + 12;
        let token = "";
        while (index < cookie.length && cookie[index] !== ";" && cookie[index] !== " ") {
            token = token + cookie[index];
            index++;
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy();
                return;
            }
            ws.handleUpgrade(req, socket, head, (wss) => {
                const { email } = decoded;
                const exp = decoded.exp; //in sec
                wss.id = email;
                wss.accessToken = token;
                wss.expiresIn = exp;
                wss.refreshInProgress = false;
                wss.lastChecked = Date.now();
                socketList[email] = wss;
                ws.emit("connection", wss, req);
            });
        });
    }
    catch (error) {
        console.log(error);
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
    }
});
ws.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("error", console.error);
    socket.on("message", (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!socket.id || !socket.accessToken || !socket.expiresIn || !socket.lastChecked)
                return; //destroy socket
            const data = JSON.parse(payload.toString());
            if (data.type === "token-refreshed") {
                console.log("Emit: ", data);
                socket.emit("refreshedToken", data.token);
                return;
            }
            if (socket.refreshInProgress) {
                yield (0, auth_1.waitForRefreshToComplete)(socket);
            }
            if (!socket.refreshInProgress && (0, auth_1.getExpiryInMinutes)(socket.accessToken) < 2) {
                socket.refreshInProgress = true;
                socket.send(JSON.stringify({
                    type: "refresh-token"
                }));
                const newToken = yield (0, auth_1.refreshToken)(socket);
                console.log("New token", newToken);
                socket.accessToken = newToken;
                socket.refreshInProgress = false;
            }
            if (socket.accessToken && data.type === "text-message") {
                const { receiverEmail, text, senderId, receiverId, senderEmail } = data;
                const receiverSocket = socketList[receiverEmail];
                const obj = { text, senderId, receiverId, senderEmail };
                (0, db_1.saveMessageToDB)(obj, socket.accessToken).catch(err => {
                    console.log("Error for saveMessageToDB()");
                });
                if (socket && socket.readyState === ws_1.default.OPEN) {
                    console.log("Sender");
                    socket.send(JSON.stringify(Object.assign({ type: "text-message" }, obj)));
                }
                if (receiverSocket && receiverSocket.readyState === ws_1.default.OPEN) {
                    console.log("receiver");
                    receiverSocket.send(JSON.stringify(Object.assign({ type: "text-message" }, obj)));
                }
            }
        }
        catch (error) {
            console.log(error);
            if (error === "Token refresh failed") {
                socket.close();
                return;
            }
        }
    }));
    socket.on("close", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("socket closed");
        if (socket.id && socketList[socket.id]) {
            delete socketList[socket.id];
        }
    }));
}));
server.listen(8080);
