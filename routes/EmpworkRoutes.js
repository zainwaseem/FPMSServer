import express from "express";
const router = express.Router();
import {
    AddEmployeeWorking, getALLEmployeesworking
} from "../controllers/empWorkingControllers.js";

import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

router.post(
    "/employeesworking",
    isAuthenticated,
    isAuthorized("supervisor"),
    AddEmployeeWorking
);
router.get(
    "/employeesworking",
    isAuthenticated,
    isAuthorized("supervisor"),
    getALLEmployeesworking
);

export default router;
