import express from "express";
import { PrismaClient } from "../generated/prisma";
import authRoutes from "./auth/auth.routes";
import { errorHandler } from "./middleware";
import cors from "cors";
import cookieParser from "cookie-parser";

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: `http://localhost:5441`,
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRoutes);
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
