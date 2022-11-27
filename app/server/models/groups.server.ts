import { supabase } from "../supabase.config";
import type { User } from "./user.server";

export type Group = {
  id: number;
  name: string;
  description: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function getGroupItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("groups")
    .select("id, name, description, created_by, created_at, updated_at")
    .eq("created_by", userId);

  return data?.map(group => ({
    userId: group.created_by,
    id: group.id,
    name: group.name,
    description: group.description,
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

  if (!error) {
    return {
      userId: data[0].created_by,
      id: data[0].id,
      name: data[0].name,
      description: data[0].description,
      createdAt: data[0].created_at,
      updatedAt: data[0].updated_at,
    };
  }

  return null;
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
    .select("*")
    .eq("created_by", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.created_by,
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  return null;
}
