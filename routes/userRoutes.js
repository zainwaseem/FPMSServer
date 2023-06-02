import express from "express";
const router = express.Router();
import {
  register,
  login,
  getALLUsers,
  logout,
  loggedIn,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";

import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get(
  "/users",
  isAuthenticated,
  isAuthorized("owner"),
  getALLUsers
);
router.get("/users/:id", isAuthenticated, isAuthorized("owner"), getUser);
router.put("/users/:id", isAuthenticated, isAuthorized("owner"), updateUser);
router.delete("/users/:id", isAuthenticated, isAuthorized("owner"), deleteUser);
router.get("/loggedin", loggedIn);
router.get("/logout", logout);

export default router;
