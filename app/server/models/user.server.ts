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

  return user;
}

export async function getUserById(id: string) {
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.getUserById(id);
  
  if (error) return null;
  if (user) return { id: user.id, email: user.email };
}



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
