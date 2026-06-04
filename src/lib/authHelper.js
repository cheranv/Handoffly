// src/lib/auth.js

import { supabase } from "./supabase";

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
