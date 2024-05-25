/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicPage, {
  DynamicTable,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import data from "@data/parcelData.json";

import { ParcelBodyType } from "src/types";

// Function to validate and transform each parcel entry
function transformParcelData(rawData: any[]): ParcelBodyType[] {
  return rawData.map((item) => ({
    destination: item.destination,
    "tracking id": item["tracking id"],
    "client id": item["client id"],
    weight: item.weight,
    status: validateStatus(item.status),
    "departure time": item["departure time"],
    "arrival time": item["arrival time"],
  }));
}

// Helper function to ensure status is one of the allowed values
function validateStatus(
  status: string
): "delivered" | "on way" | "delayed" | "not assigned" {
  const validStatuses: ("delivered" | "on way" | "delayed" | "not assigned")[] =
    ["delivered", "on way", "delayed", "not assigned"];
  if (!validStatuses.includes(status as any)) {
    throw new Error(`Invalid status value: ${status}`);
  }
  return status as "delivered" | "on way" | "delayed" | "not assigned";
}

const transformedData = transformParcelData(data.body);

export default function Parcels() {
  const { header, body } = { header: data.header, body: transformedData };
  return (
    <DynamicPage title="parcels">
      <DynamicTable<ParcelBodyType>
        header={header}
        body={body}
        gridColumns="1fr 1fr 1fr 1.5fr 1.5fr 1fr 1fr"
      />
    </DynamicPage>
  );
}
