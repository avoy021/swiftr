import jwt from "jsonwebtoken";
import { CustomWebsocket } from "./types";

export const getExpiryInMinutes = (accessToken:string):number => {
    try {
        // to skip this step everytime or 30s keep the decoded.exp of new token in socket.expiryIn
        const decoded = jwt.decode(accessToken) as any;
        const now = Math.floor(Date.now()/1000); // ms/1000 => converted to sec
        const expiry = decoded.exp - now;
        return Math.floor(expiry/60);
    } catch (error) {
        return 0; // if token is invalid, implies expired
    }
}

export const refreshToken = async(socket:CustomWebsocket): Promise<string> => {
    return new Promise((resolve,reject) => {
        const timeout = setTimeout(() => {
            socket.accessToken = "";
            socket.refreshInProgress = false;
            reject("Token refresh failed"); 
        },5000) // 5s

        socket.once("refreshedToken", token => {
            clearTimeout(timeout);
            resolve(token);
        })
    })
} 

export const waitForRefreshToComplete = (socket:CustomWebsocket): Promise<void> => {
    return new Promise((resolve) => {
        const checkRefresh = () => {
            if (!socket.refreshInProgress) {
                resolve();
            } else {
                setTimeout(checkRefresh, 50); // Check every 50ms
            }
        };
        checkRefresh();
    });
}