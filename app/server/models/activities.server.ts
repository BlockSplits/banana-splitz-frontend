import { supabase } from "../supabase.config";
import type { Group } from "./groups.server";
import type { User } from "./user.server";

export type Activity = {
  id: number;
  group_id: number;
  name: string;
  total: number;
  payer: string;
  created_by: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export async function createActivity({
  name,
  total,
  groupId,
  userId,
}: Pick<Activity, "name" | "total"> & {
  userId: User["id"];
  groupId: Group["id"];
}) {
  const { data, error } = await supabase
    .from("activity")
    .insert([
      { name, group_id: groupId, total, payer: userId, created_by: userId },
    ])
    .select();
  console.log(data, error);
  if (!error) {
    return data;
  }

  return null;
}

export async function getGroupActivities({
  groupId,
}: {
  groupId: Group["id"];
}) {
  const { data, error } = await supabase
    .from("activity")
    .select("*")
    .eq("group_id", groupId);

  if (!error) {
    return data;
  }

  return null;
}
