import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
    try {
        if (req.headers["authorization"] && req.headers["authorization"]?.startsWith("Bearer ")) {
            const token = req.headers["authorization"]?.split(" ")[1];
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
};
export default authMiddleware;
