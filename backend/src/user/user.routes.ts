import express from "express";

import * as userController from "./user.controller";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.get("/me", isAuthenticated, userController.getMe);

export default router;
