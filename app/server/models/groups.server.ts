import { supabase } from "../supabase.config";
import type { User } from "./user.server";

export type Group = {
  id: number;
  name: string;
  description: string;
  userId: string;
  groupsMembers?: { user_id: string }[];
  createdAt?: string;
  updatedAt?: string;
};

export async function getGroupItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("groups")
    .select(
      "id, name, description, created_by, created_at, updated_at, groups_members ( user_id )"
    )
    .eq("created_by", userId);

  return data?.map((group) => ({
    userId: group.created_by,
    id: group.id,
    name: group.name,
    description: group.description,
    groupsMembers: group.groups_members,
    createdAt: group.created_at,
    updatedAt: group.updated_at,
  }));
}

export async function createGroup({
  name,
  description,
  userId,
}: Pick<Group, "name" | "description"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("groups")
    .insert([{ name, description, created_by: userId }])
    .select();

  if (error) {
    return null;
  }

  const { data: groupMembers, error: errorGroupMembers } = await supabase
    .from("groups_members")
    .insert([{ group_id: data[0].id, user_id: userId }])
    .select();
  console.log(errorGroupMembers);
  if (errorGroupMembers) {
    return null;
  }

  return {
    userId: data[0].created_by,
    id: data[0].id,
    name: data[0].name,
    description: data[0].description,
    createdAt: data[0].created_at,
    updatedAt: data[0].updated_at,
    groupMembers: groupMembers,
  };
}

export async function deleteGroup({
  id,
  userId,
}: Pick<Group, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("groups")
    .delete()
    .match({ id, created_by: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getGroup({
  id,
  userId,
}: Pick<Group, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("groups")
    .select("*, groups_members ( user_id )")
    .eq("created_by", userId)
    .eq("id", id)
    .single();
  console.log(data);
  if (!error) {
    return {
      userId: data.created_by,
      id: data.id,
      name: data.name,
      description: data.description,
      groupsMembers: data.groups_members,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  return null;
}
