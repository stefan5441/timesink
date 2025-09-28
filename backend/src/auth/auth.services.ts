import prisma from "../utils/prisma";
import { RefreshToken } from "@prisma/client";

import { hashToken } from "../utils/hash";

interface AddRefreshTokenInput {
  refreshToken: string;
  userId: string;
}

export async function addRefreshTokenToWhitelist({
  refreshToken,
  userId,
}: AddRefreshTokenInput): Promise<RefreshToken> {
  return prisma.refreshToken.create({
    data: {
      hashedToken: hashToken(refreshToken),
      userId,
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });
}

export async function findRefreshToken(token: string): Promise<RefreshToken | null> {
  return prisma.refreshToken.findUnique({
    where: {
      hashedToken: hashToken(token),
    },
  });
}

export async function deleteRefreshTokenById(id: string): Promise<RefreshToken> {
  return prisma.refreshToken.update({
    where: { id },
    data: { revoked: true },
  });
}

export async function revokeTokens(userId: string): Promise<{ count: number }> {
  return prisma.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });
}
