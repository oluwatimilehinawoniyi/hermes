import supabase from "@utils/supabase";
import { RequestBodyType } from "src/types";

// function to get order requests
export async function getRequests(): Promise<RequestBodyType[]> {
  const { data, error } = await supabase.from("requests").select();
  if (error) {
    throw error;
  }
  return data;
}
