import express from "express";
const router = express.Router();
import {
  SaveMssage,
  getAllMessages,
  deleteMessage,
} from "../controllers/contactControllers.js";

import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

router.post("/messages", SaveMssage);
router.get(
  "/messages",
  isAuthenticated,
  isAuthorized("manager"),
  getAllMessages
);
router.delete(
  "/messages/:id",
  isAuthenticated,
  isAuthorized("manager"),
  deleteMessage
);

export default router;
