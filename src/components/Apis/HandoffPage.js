import { supabase } from "../../lib/supabase";

export const GetProject = async ({ params, request }) => {
  const { id: id } = params;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Response("Project not found", {
      status: 404,
    });
  }

  return { data };
};
