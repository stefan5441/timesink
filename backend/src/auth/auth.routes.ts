import express from "express";

import * as authController from "./auth.controller";

const router = express.Router();

router.post("/login/google", authController.googleLogin);
router.post("/logout", authController.logout);
router.post("/refreshToken", authController.refreshToken);

export default router;
