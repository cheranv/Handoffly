import { supabase } from "../../lib/supabase";

export const FetchProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
    throw error;
  } else {
    return { data };
  }
};
