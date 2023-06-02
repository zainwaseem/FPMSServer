import express from "express";
const router = express.Router();
import {
  AddEmployee,
  getALLEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/EmployeeControllers.js";

import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

router.post(
  "/employees",
  isAuthenticated,
  isAuthorized("supervisor"),
  AddEmployee
);
router.get(
  "/employees",
  isAuthenticated,
  isAuthorized("owner", "manager", "supervisor"),
  getALLEmployees
);
router.get(
  "/employees/:id",
  isAuthenticated,
  isAuthorized("owner", "supervisor"),
  getEmployee
);
//update
router.put(
  "/employees/:id",
  isAuthenticated,
  isAuthorized("supervisor"),
  updateEmployee
);
router.delete(
  "/employees/:id",
  isAuthenticated,
  isAuthorized("supervisor"),
  deleteEmployee
);

export default router;
