import { supabase } from "../../lib/supabase";

export const GetProject = async ({ params, request }) => {
  const { id: id } = params;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }

  return { data };
};
