/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicPage, {
  DynamicTable,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import data from "@data/clientsData.json";
import { ClientBodyType } from "src/types";

// interface ClientBodyType {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   status: "active" | "inactive";
// }

// Function to validate and transform each request entry
function transformClientData(rawData: any[]): ClientBodyType[] {
  return rawData.map((item) => ({
    id: item["id"],
    name: item["name"],
    email: item["email"],
    phone: item["phone"],
    address: item["address"],
    status: validateStatus(item.status),
  }));
}

// Helper function to ensure status is one of the allowed values
function validateStatus(status: string): "active" | "inactive" {
  const validStatuses: ("active" | "inactive")[] = ["active", "inactive"];
  if (!validStatuses.includes(status as any)) {
    throw new Error(`Invalid status value: ${status}`);
  }
  return status as "active" | "inactive";
}

const transformedData = transformClientData(data.body);

export default function Clients() {
  const { header, body } = { header: data.header, body: transformedData };

  return (
    <DynamicPage title="clients">
      <DynamicTable<ClientBodyType>
        header={header}
        body={body}
        gridColumns="1fr 1.5fr 2fr 1.5fr 2fr 1fr"
      />
    </DynamicPage>
  );
}
