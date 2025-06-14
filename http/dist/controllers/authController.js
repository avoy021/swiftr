var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email or Password missing" });
            return;
        }
        const userExists = yield prisma.user.findUnique({
            where: {
                email
            }
        });
        if (userExists) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashPassword = yield bcrypt.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                email,
                password: hashPassword
            }
        });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
export const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email or password is missing" });
            return;
        }
        const userExists = yield prisma.user.findUnique({
            where: { email }
        });
        if (!userExists || !(yield bcrypt.compare(password, userExists.password))) {
            res.status(400).json({ message: "Incorrect username or password" });
            return;
        }
        const accessToken = generateAccessToken({ email });
        const refreshToken = generateRefreshToken({ email });
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 // 1000ms=1s
        });
        res.status(200).json({ message: "Login successful", email, accessToken });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
export const generateAccessToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: "5m" });
};
export const generateRefreshToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: "1h" });
};
