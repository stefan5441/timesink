// services/refreshToken.service.ts
import prisma from "../utils/prisma";
import { hashToken } from "../utils/hash";
import { RefreshToken } from "@prisma/client";

interface AddRefreshTokenInput {
  refreshToken: string;
  userId: string;
}

// Adds a new refresh token with 30 days expiry
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

// Finds a refresh token by its hashed token value
export async function findRefreshToken(token: string): Promise<RefreshToken | null> {
  return prisma.refreshToken.findUnique({
    where: {
      hashedToken: hashToken(token),
    },
  });
}

// Marks a refresh token as revoked by id (soft delete)
export async function deleteRefreshTokenById(id: string): Promise<RefreshToken> {
  return prisma.refreshToken.update({
    where: { id },
    data: { revoked: true },
  });
}

// Revoke all refresh tokens for a user
export async function revokeTokens(userId: string): Promise<{ count: number }> {
  return prisma.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });
}
