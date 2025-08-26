import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "@prisma/client";

export function generateAccessToken(user: User) {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET environment variable is not defined");
  }

  return jwt.sign({ userId: user.id }, secret, {
    expiresIn: "5m",
  });
}

export function generateRefreshToken() {
  const token = crypto.randomBytes(16).toString("base64url");
  return token;
}

export function generateTokens(user: User) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  return { accessToken, refreshToken };
}
