import express from "express";
const router = express.Router();
import {
  AddOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/OrderControllers.js";

import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

router.get(
  "/orders",
  isAuthenticated,
  isAuthorized("owner", "supervisor", "manager", "user"),
  getAllOrders
);

router.post(
  "/orders",
  isAuthenticated,
  isAuthorized("owner", "user"),
  AddOrder
);
router.patch(
  "/orders/:id",
  isAuthenticated,
  isAuthorized("owner"),
  updateOrder
);

router.delete(
  "/orders/:id",
  isAuthenticated,
  isAuthorized("owner"),
  deleteOrder
);

export default router;
