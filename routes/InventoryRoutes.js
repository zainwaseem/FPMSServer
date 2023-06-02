import express from "express";
const router = express.Router();

import {
  getALLInventroies,
  placeInevtory,
  deleteInventory,
  updateInventory,
} from "../controllers/InventoryControllers.js";

import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

router.post(
  "/inventory",
  isAuthenticated,
  isAuthorized("manager"),
  placeInevtory
);
router.get(
  "/inventory",
  isAuthenticated,
  isAuthorized("owner", "supervisor", "manager"),
  getALLInventroies
);
// router.get(
//   "/employees/:id",
//   isAuthenticated,
//   isAuthorized("owner", "supervisor"),
//   getEmployee
// );
// //update
// router.put(
//   "/inventory/:id",
//   isAuthenticated,
//   isAuthorized("owner", "supervisor", "manager"),
//   updateInventory
// );
router.delete(
  "/inventory/:id",
  isAuthenticated,
  isAuthorized("manager"),
  deleteInventory
);

export default router;
