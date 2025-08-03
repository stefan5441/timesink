import express from "express";
import { PrismaClient } from "../generated/prisma";
import authRoutes from "./auth/auth.routes";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

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
