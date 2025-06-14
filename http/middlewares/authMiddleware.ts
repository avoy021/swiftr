import { NextFunction, Request, Response, } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: { email:string,id:number }
}

const authMiddleware = async(req:CustomRequest,res:Response,next:NextFunction) => {
    try {
        if(req.headers["authorization"] && req.headers["authorization"]?.startsWith("Bearer ")) {
            const token = req.headers["authorization"]?.split(" ")[1];
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string, (err,decoded) => {
                if(err) {
                    res.status(401).json({message: "Token is invalid"});
                    return;
                }
                req.user = decoded as {email:string,id:number};
                next();
            })
        }
        else {
            res.status(401).json({message:"Token is missing"});
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
} 

export default authMiddleware;