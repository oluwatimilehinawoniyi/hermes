import supabase from "@utils/supabase";

// function to get order requests
export async function getShipments() {
  const { data, error } = await supabase.from("shipments").select();
  if (error) {
    throw error;
  }
  return data;
}
