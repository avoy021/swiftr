import WebSocket from "ws";

export interface CustomWebsocket extends WebSocket {
    id?: string;
    accessToken?: string;
    expiresIn?: number,
    lastChecked?: number,
    refreshInProgress?: boolean
}