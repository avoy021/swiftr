"use strict";
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
exports.waitForRefreshToComplete = exports.refreshToken = exports.getExpiryInMinutes = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getExpiryInMinutes = (accessToken) => {
    try {
        // to skip this step everytime or 30s keep the decoded.exp of new token in socket.expiryIn
        const decoded = jsonwebtoken_1.default.decode(accessToken);
        const now = Math.floor(Date.now() / 1000); // ms/1000 => converted to sec
        const expiry = decoded.exp - now;
        return Math.floor(expiry / 60);
    }
    catch (error) {
        return 0; // if token is invalid, implies expired
    }
};
exports.getExpiryInMinutes = getExpiryInMinutes;
const refreshToken = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            socket.accessToken = "";
            socket.refreshInProgress = false;
            reject("Token refresh failed");
        }, 5000); // 5s
        socket.once("refreshedToken", token => {
            clearTimeout(timeout);
            resolve(token);
        });
    });
});
exports.refreshToken = refreshToken;
const waitForRefreshToComplete = (socket) => {
    return new Promise((resolve) => {
        const checkRefresh = () => {
            if (!socket.refreshInProgress) {
                resolve();
            }
            else {
                setTimeout(checkRefresh, 50); // Check every 50ms
            }
        };
        checkRefresh();
    });
};
exports.waitForRefreshToComplete = waitForRefreshToComplete;
