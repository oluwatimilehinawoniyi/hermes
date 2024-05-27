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

interface ClientBodyType {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
}

interface ClientDataType {
  header: string[];
  body: ClientBodyType[];
}

interface RequestBodyType {
  id: string;
  weight: number;
  destination: string;
  "request date": string;
  status: "pending" | "accepted";
}

interface RequestDataType {
  header: string[];
  body: RequestBodyType[];
}

export type {
  ShipmentDataType,
  ParcelDataType,
  ParcelBodyType,
  ShipmentBodyType,
  ClientDataType,
  ClientBodyType,
  RequestDataType,
  RequestBodyType,
};
