/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicPage, {
  DynamicTable,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import data from "@data/shipmentData.json";
import { ShipmentBodyType } from "src/types";

// Function to validate and transform each shipment entry
function transformShipmentData(rawData: any[]): ShipmentBodyType[] {
  return rawData.map((item) => ({
    destination: item.destination,
    id: item.id,
    truck: item.truck,
    "weight (kg)": item["weight (kg)"],
    status: validateStatus(item.status),
    "departure date": item["departure date"],
    "arrival date": item["arrival date"],
    "time delay": item["time delay"],
  }));
}

// Helper function to ensure status is one of the allowed values
function validateStatus(status: string): "arrived" | "on way" | "delayed" {
  const validStatuses: ("arrived" | "on way" | "delayed")[] = [
    "arrived",
    "on way",
    "delayed",
  ];
  if (!validStatuses.includes(status as any)) {
    throw new Error(`Invalid status value: ${status}`);
  }
  return status as "arrived" | "on way" | "delayed";
}

const transformedData = transformShipmentData(data.body);

export default function Shipment() {
  const { header, body } = { header: data.header, body: transformedData };

  return (
    <DynamicPage title="shipments">
      <DynamicTable<ShipmentBodyType>
        
        header={header}
        body={body}
        gridColumns="1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
      />
    </DynamicPage>
  );
}
