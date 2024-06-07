import supabase from "@utils/supabase";

// function to get order requests
export async function getClients() {
  const { data, error } = await supabase.from("clients").select();
  return { data, error };
}
