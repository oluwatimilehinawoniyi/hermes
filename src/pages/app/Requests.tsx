/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicPage, {
  DynamicHeader,
  DynamicTable,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import Filter from "@components/UI/DashboardRelated/Filter/Filter";

import data from "@data/requestData.json";
import { RequestBodyType } from "src/types";

// Function to validate and transform each request entry
function transformParcelData(rawData: any[]): RequestBodyType[] {
  return rawData.map((item) => ({
    id: item["id"],
    weight: item.weight,
    destination: item.destination,
    "request date": item["request date"],
    status: validateStatus(item.status),
  }));
}

// Helper function to ensure status is one of the allowed values
function validateStatus(status: string): "pending" | "accepted" {
  const validStatuses: ("pending" | "accepted")[] = ["pending", "accepted"];
  if (!validStatuses.includes(status as any)) {
    throw new Error(`Invalid status value: ${status}`);
  }
  return status as "pending" | "accepted";
}

const transformedData = transformParcelData(data.body);

export default function Requests() {
  const { header, body } = { header: data.header, body: transformedData };

  // // Function to handle accepting a request
  // const handleAcceptRequest = (requestId: string) => {
  //   // Find the request and update its status
  //   const updatedBody = body.map((request) =>
  //     request.id === requestId ? { ...request, status: "accepted" } : request
  //   );
  //   // Ideally, this should be saved back to the backend or state management
  //   console.log("Accepted request:", requestId);
  // };

  const filterBtns = [
    { item: "accepted", length: 5 },
    { item: "pending", length: 35 },
  ];

  return (
    <DynamicPage
      headerFilters={
        <DynamicHeader title="requests" dataFilters={filterBtns}>
          <Filter
            options={[
              { value: "weigth", label: "weigth" },
              { value: "status", label: "status" },
              { value: "date", label: "date" },
            ]}
          />
        </DynamicHeader>
      }
      tableComponent={
        <DynamicTable<RequestBodyType>
          header={header}
          body={body}
          gridColumns="1fr 2fr 1fr 1.5fr 1fr"
        />
      }
    />
  );
}
