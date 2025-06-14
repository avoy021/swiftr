import express from "express";
import { saveContactController,fetchContactsController,saveMessageController,fetchMessageController } from "../controllers/chatController.js"
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/contacts", authMiddleware, fetchContactsController);
router.post("/saveContact", authMiddleware, saveContactController);
router.post("/saveMessage", authMiddleware, saveMessageController);
router.get("/messages", authMiddleware, fetchMessageController);

export default router;
