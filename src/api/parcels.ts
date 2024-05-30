import supabase from "@utils/supabase";
import { ParcelBodyType } from "src/types";

// function to get order requests
export async function getParcels(): Promise<ParcelBodyType[]> {
  const { data, error } = await supabase.from("parcels").select();
  if (error) {
    throw error;
  }
  return data;
}
