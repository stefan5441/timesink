import { Response } from "express";

import * as userService from "./user.services";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthenticatedRequest } from "../middleware/auth";

export const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await userService.findUserById((req as any).userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ id: user.id, email: user.email, username: user.username });
});
