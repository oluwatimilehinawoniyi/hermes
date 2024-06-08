import supabase from "@utils/supabase";
import {
  ClientBodyType,
  ParcelBodyType,
  RequestBodyType,
  ShipmentBodyType,
} from "src/types";

interface FetchResult<T> {
  data: T[] | null;
  error: string | null;
}

export async function getRequests(): Promise<FetchResult<RequestBodyType>> {
  const { data, error } = await supabase.from("requests").select();
  return { data, error: error ? error.message : null };
}

export async function getParcels(): Promise<FetchResult<ParcelBodyType>> {
  const { data, error } = await supabase.from("parcels").select();
  return { data, error: error ? error.message : null };
}

export async function getShipments(): Promise<FetchResult<ShipmentBodyType>> {
  const { data, error } = await supabase.from("shipments").select();
  return { data, error: error ? error.message : null };
}

export async function getClients(): Promise<FetchResult<ClientBodyType>> {
  const { data, error } = await supabase.from("clients").select();
  return { data, error: error ? error.message : null };
}
