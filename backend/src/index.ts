import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import prisma from "./utils/prisma";
import { errorHandler } from "./middleware";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";
import activityRoutes from "./activity/activity.routes";
import activityRecordRoutes from "./activityRecord/activityRecord.routes";

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: `http://localhost:5441`,
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
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
