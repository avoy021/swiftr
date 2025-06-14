"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveMessageToDB = void 0;
const axios_1 = __importDefault(require("axios"));
const saveMessageToDB = (item, accessToken) => {
    try {
        (0, axios_1.default)({
            url: "http://localhost:8000/api/chat/saveMessage",
            method: "POST",
            data: item,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.saveMessageToDB = saveMessageToDB;
