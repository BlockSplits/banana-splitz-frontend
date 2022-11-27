import bcrypt from "bcryptjs";
import { supabase } from "../supabase.config";

export type User = { id: string; email: string };

export async function createUser(email: string, password: string) {
  const {
    data: { user },
  } = await supabase.auth.signUp({
    email,
    password,
  });

  // get the user profile after created
  // const profile = await getProfileByEmail(user?.email);

  return user;
}

export async function getProfileById(id: string) {
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.getUserById(id);

  if (error) return null;
  if (user) return { id: user.id, email: user.email };
}

// export async function getProfileByEmail(email?: string) {
//   const { data, error } = await supabase
//     .from("profiles")
//     .select("email, id")
//     .eq("email", email)
//     .single();

//   if (error) return null;
//   if (data) return data;
// }

export async function verifyLogin(email: string, password: string) {
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return undefined;

  if (user) return { id: user.id, email: user.email };
}
