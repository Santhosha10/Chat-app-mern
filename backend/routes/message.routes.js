import express from'express';
import protectRoute from '../middleware/protectRoute.js';
import { deleteMessage, editMessage, getMessages,sendMessage,toggleReaction } from '../Controllers/message.controller.js';

const router = express.Router();

router.get("/:id",protectRoute,getMessages);

router.post("/send/:id",protectRoute,sendMessage);

router.patch("/:id/reaction",protectRoute,toggleReaction);

router.patch("/:id",protectRoute,editMessage);

router.delete("/:id",protectRoute,deleteMessage);

export default router
