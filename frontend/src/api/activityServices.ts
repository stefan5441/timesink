import type { Activity, Color } from "@prisma/client";
import { client } from "../auth/axiosClient";

type CreateActivityPayload = {
  name: string;
  color: Color;
};

type UpdateActivityPayload = {
  id: string;
  name?: string;
  color?: Color;
};

export async function createActivity({ name, color }: CreateActivityPayload): Promise<Activity> {
  const res = await client.post<Activity>("activity", { name, color });
  return res.data;
}

export async function getActivities(): Promise<Activity[]> {
  const res = await client.get<Activity[]>("activity");
  return res.data;
}

export async function getActivity(id: string): Promise<Activity> {
  const res = await client.get<Activity>(`activity/${id}`);
  return res.data;
}

export async function updateActivity({ id, name, color }: UpdateActivityPayload): Promise<Activity> {
  const res = await client.put<Activity>(`activity/${id}`, { name, color });
  return res.data;
}

export async function deleteActivity(id: string): Promise<Activity> {
  const res = await client.delete<Activity>(`activity/${id}`);
  return res.data;
}
