import { Request, Response, NextFunction } from "express";

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
