import supabase from "@utils/supabase";

// function to get order requests
export async function getRequests() {
  const { data, error } = await supabase.from("requests").select();
  return { data, error };
}
