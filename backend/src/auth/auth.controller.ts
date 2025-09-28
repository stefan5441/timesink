import { OAuth2Client } from "google-auth-library";
import { Request, Response, NextFunction } from "express";

import { generateTokens } from "../utils/jwt";
import * as authService from "./auth.services";
import { asyncHandler } from "../utils/asyncHandler";
import { findOrCreateGoogleUser, findUserById } from "../user/user.services";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
  const { idToken } = req.body;
  if (!idToken) {
    res.status(400);
    throw new Error("Missing Google ID token.");
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload?.email) {
    res.status(400);
    throw new Error("Invalid Google token.");
  }

  const user = await findOrCreateGoogleUser({
    email: payload.email,
    name: payload.name,
  });

  const { accessToken, refreshToken } = generateTokens(user);
  await authService.addRefreshTokenToWhitelist({ refreshToken, userId: user.id });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  res.json({ accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const existingToken = await authService.findRefreshToken(refreshToken);
    if (existingToken) {
      await authService.deleteRefreshTokenById(existingToken.id);
    }
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(400);
    throw new Error("Missing refresh token.");
  }

  const savedRefreshToken = await authService.findRefreshToken(refreshToken);
  if (!savedRefreshToken || savedRefreshToken.revoked || Date.now() >= savedRefreshToken.expireAt.getTime()) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const user = await findUserById(savedRefreshToken.userId);
  if (!user) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  await authService.deleteRefreshTokenById(savedRefreshToken.id);

  const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
  await authService.addRefreshTokenToWhitelist({
    refreshToken: newRefreshToken,
    userId: user.id,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  res.json({ accessToken });
});
