import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import { chatRoute, userRoute } from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRoute);
app.use("/api/chat",chatRoute);

app.get("/", (req,res) => {
    res.send("Http server is running");
    res.end();
})


app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))