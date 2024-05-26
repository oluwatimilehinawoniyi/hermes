/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicPage, {
  DynamicHeader,
  DynamicTable,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import Filter from "@components/UI/DashboardRelated/Filter/Filter";
import data from "@data/clientsData.json";
import { ClientBodyType } from "src/types";

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

  const filterBtns = [
    { item: "active", length: 5 },
    { item: "inactive", length: 35 },
  ];
  return (
    <DynamicPage
      headerFilters={
        <DynamicHeader title="clients" dataFilters={filterBtns}>
          <Filter options={[{ value: "status", label: "status" }]} />{" "}
        </DynamicHeader>
      }
      tableComponent={
        <DynamicTable<ClientBodyType>
          header={header}
          body={body}
          gridColumns="1fr 1.5fr 2fr 1.5fr 2fr 1fr"
        />
      }
    />
  );
}
