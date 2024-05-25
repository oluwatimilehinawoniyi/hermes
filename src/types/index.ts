interface ShipmentDataType {
  header: string[];
  body: ShipmentBodyType[];
}

interface ShipmentBodyType {
  destination: string;
  id: string;
  truck: string;
  "weight (kg)": number;
  status: "arrived" | "on way" | "delayed";
  "departure date": string;
  "arrival date": string;
  "time delay": string;
}

interface ParcelDataType {
  header: string[];
  body: ParcelBodyType[];
}

interface ParcelBodyType {
  "tracking id": string;
  "client id": string;
  weight: number;
  "arrival time": string;
  "departure time": string;
  destination: string;
  status: "delivered" | "on way" | "delayed" | "not assigned";
}

export type {
  ShipmentDataType,
  ParcelDataType,
  ParcelBodyType,
  ShipmentBodyType,
};
