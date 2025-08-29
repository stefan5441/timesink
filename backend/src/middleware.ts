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

  if (!authorization) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }

  try {
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      throw new Error("JWT_ACCESS_SECRET is not defined");
    }
    const payload = jwt.verify(token, secret) as JwtPayload;
    req.payload = payload;

    if (typeof payload === "object" && payload.userId) {
      req.userId = payload.userId;
    } else {
      throw new Error("UserId not found in token");
    }

    next();
  } catch (err: any) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      throw new Error(err.name);
    }
    throw new Error("🚫 Un-Authorized 🚫");
  }
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  if (err.name === "ValidationError" && err.errors) {
    return res.status(400).json({
      message: err.errors[0], // only send the first error
    });
  }

  if (err.code && err.clientVersion) {
    return res.status(500).json({
      message: "Database error. Please try again later.",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Session expired. Please log in again.",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token.",
    });
  }

  const response = {
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
}
