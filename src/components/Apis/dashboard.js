import { supabase } from "../../lib/supabase";

export const FetchProjects = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
    throw error;
  } else {
    return { data };
  }
};
