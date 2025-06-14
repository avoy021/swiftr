var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (req.headers["authorization"] && ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer "))) {
            const token = (_b = req.headers["authorization"]) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ message: "Token is invalid" });
                    return;
                }
                req.user = decoded;
                next();
            });
        }
        else {
            res.status(401).json({ message: "Token is missing" });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
export default authMiddleware;
