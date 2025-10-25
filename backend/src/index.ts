import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import prisma from "./utils/prisma";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";
import activityRoutes from "./activity/activity.routes";
import { errorHandler } from "./middleware/errorHandler";
import activityRecordRoutes from "./activityRecord/activityRecord.routes";

const app = express();

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "0.0.0.0";

console.log(process.env.CORS_ORIGIN);
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.options(/(.*)/, cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/activity", activityRoutes);
app.use("/activity-record", activityRecordRoutes);

app.use(errorHandler);

async function main() {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
