import prisma from "../utils/prisma";
import { User } from "@prisma/client";

export async function findOrCreateGoogleUser(profile: { email: string; name?: string }): Promise<User> {
  let user = await prisma.user.findUnique({
    where: { email: profile.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: profile.email,
        username: profile.name || profile.email.split("@")[0],
      },
    });
  }

  return user;
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}
