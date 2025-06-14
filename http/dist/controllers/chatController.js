var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { z } from "zod";
import prisma from "../config/prismaClient.js";
const validContact = z.object({
    email: z.string().email("Please enter a valid email"),
    name: z.string()
});
export const saveContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name } = req.body;
        const validSchema = validContact.parse({ email, name });
        const userExists = yield prisma.user.findUnique({
            where: { email }
        });
        if (!userExists) {
            res.status(400).json({ message: "User doesn't exist with this email" });
            return;
        }
        if (!req.user)
            throw new Error("Auth middleware error");
        const saveContact = yield prisma.contact.create({
            data: {
                userId: req.user.id,
                contactId: userExists.id,
                name
            },
            select: {
                name: true,
                contactId: true,
                contact: {
                    select: { email: true }
                }
            }
        });
        res.status(201).json(saveContact);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
export const fetchContactsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userContacts = yield prisma.contact.findMany({
            where: { userId: id },
            select: {
                contactId: true,
                name: true,
                contact: {
                    select: { email: true }
                }
            }
        });
        res.status(200).json({ message: "Contacts fetched", userContacts });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
export const saveMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            return;
        const { text, receiverId } = req.body;
        const saveMessage = yield prisma.message.create({
            data: {
                senderId: id,
                text,
                receiverId
            }
        });
        res.status(201).json({ message: "Message saved" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
export const fetchMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const messages = yield prisma.message.findMany({
            where: {
                OR: [
                    { senderId: id },
                    { receiverId: id }
                ]
            }
        });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
