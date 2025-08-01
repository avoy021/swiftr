import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signupController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email or Password missing" });
            return;
        }
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (userExists) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
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
};
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email or password is missing" });
            return;
        }
        const userExists = await prisma.user.findUnique({
            where: { email }
        });
        if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
            res.status(400).json({ message: "Incorrect username or password" });
            return;
        }
        const id = userExists.id;
        const accessToken = generateAccessToken({ email, id });
        const refreshToken = generateRefreshToken({ email, id });
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 // => 1h
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 3 * 60 * 1000 // => 1m
        });
        res.status(200).json({ username: email, accessToken, userId: id });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
export const generateAccessToken = (payload) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    return jwt.sign(payload, secret, { expiresIn: "3m" });
};
export const generateRefreshToken = (payload) => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    return jwt.sign(payload, secret, { expiresIn: "1h" });
};
export const refreshTokenController = (req, res) => {
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Refresh token invalid" });
                return;
            }
            const { email, id } = decoded;
            const accessToken = generateAccessToken({ email, id });
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 3 * 60 * 1000 //in ms => 1min
            });
            res.status(201).json({ message: "Token created", username: email, accessToken, userId: id });
            return;
        });
    }
    catch (error) {
        res.status(401).json({ message: "Refresh Token invalid or cookie missing" });
        return;
    }
};
export const logoutController = async (req, res) => {
    try {
        const jwt = req.cookies.jwt;
        if (jwt) {
            res.clearCookie("jwt", { httpOnly: true });
            const accessToken = req.cookies.accessToken;
            if (accessToken) {
                res.clearCookie("accessToken", { httpOnly: true });
            }
            res.status(200).json({ message: "Logout successful" });
            return;
        }
        res.status(404).json({ message: "No cookie to clear" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Logout failed" });
    }
};
