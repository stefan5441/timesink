import { client } from "../auth/axiosClient";
import type { User } from "@prisma/client";

export async function getMe(): Promise<User> {
  const res = await client.get("/user/me");
  return res.data;
}
