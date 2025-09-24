import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  payload?: string | JwtPayload;
  userId?: string;
}

export function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.method === "OPTIONS") {
    return next();
  }

  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    console.error("JWT_ACCESS_SECRET is not defined");
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    req.payload = payload;

    if (typeof payload === "object" && typeof payload.userId === "string") {
      req.userId = payload.userId;
      return next();
    }

    return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  if (err.code && typeof err.code === "string" && err.clientVersion) {
    return res.status(500).json({
      error: { message: "Database error. Please try again later.", code: err.code },
    });
  }

  if (err.name === "ValidationError" && Array.isArray(err.errors)) {
    return res.status(400).json({
      error: { message: err.errors[0] },
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: { message: "Session expired. Please log in again." } });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: { message: "Invalid token." } });
  }

  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
}
