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
