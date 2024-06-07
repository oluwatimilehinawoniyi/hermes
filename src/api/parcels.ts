/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from "@utils/supabase";

interface ParcelInfo {
  id: string;
  status: string;
  request: {
    weight: number;
    origin: string;
    destination: string;
  };
}

interface ParcelApiResponse {
  data: ParcelInfo[];
  error: string | null;
}

// function to get parcels
export async function getParcels() {
  const { data, error } = await supabase.from("parcels").select();
  return { data, error };
}

export async function getParcelInfo(): Promise<ParcelApiResponse> {
  try {
    const { data, error } = await supabase.from("parcels").select(`
        id,
        status,
        request: requests (weight, origin, destination)
    `);

    if (error) {
      return { data: [], error: error.message };
    }

    const formattedData = data.map((parcel) => ({
      ...parcel,
      request: parcel.request[0],
    }));

    return { data: formattedData, error: null };
  } catch (error: any) {
    return { data: [], error: error.message || "Unknown error" };
  }
}
