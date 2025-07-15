import { z } from "zod";
import prisma from "../config/prismaClient.js";
const validContact = z.object({
    email: z.string().email("Please enter a valid email"),
    name: z.string()
});
export const saveContactController = async (req, res) => {
    try {
        const { email, name } = req.body;
        const validSchema = validContact.parse({ email, name });
        const userExists = await prisma.user.findUnique({
            where: { email }
        });
        if (!userExists) {
            res.status(400).json({ message: "User doesn't exist with this email" });
            return;
        }
        if (!req.user)
            throw new Error("Auth middleware error");
        const saveContact = await prisma.contact.create({
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
};
export const fetchContactsController = async (req, res) => {
    try {
        const id = req.user?.id;
        const userContacts = await prisma.contact.findMany({
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
};
export const saveMessageController = async (req, res) => {
    try {
        const id = req.user?.id;
        if (!id)
            return;
        const { text, receiverId } = req.body;
        const saveMessage = await prisma.message.create({
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
};
export const fetchMessageController = async (req, res) => {
    try {
        const id = req.user?.id;
        const messages = await prisma.message.findMany({
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
};
