import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
import type { User } from "../../generated/prisma";

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUserByEmailAndPassword(user: { email: string; password: string }): Promise<User> {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  return prisma.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
    },
  });
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}
