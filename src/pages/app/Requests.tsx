/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicPage, {
  DynamicHeader,
  DynamicTable,
  FilterButton,
  FilterButtonsBox,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import Filter from "@components/UI/DashboardRelated/Filter/Filter";

import data from "@data/requestData.json";
import { transformData, validateStatus } from "@utils/TransformData";
import { useState } from "react";
import { RequestBodyType } from "src/types";

const validRequestStatuses: ReadonlyArray<"pending" | "accepted"> = [
  "pending",
  "accepted",
];

const transformedData = transformData<RequestBodyType>(data.body, (status) =>
  validateStatus(status, validRequestStatuses)
);

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
    { item: "all", length: body.length },
    ...["accepted", "pending"].map((status) => ({
      item: status,
      length: body.filter((item) => item.status === status).length,
    })),
  ];

  const [filter, setFilter] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<number>(0);

  function handleBtnClickEvent(index: number) {
    setActiveFilter(index);
    setFilter(filterBtns[index].item);
  }

  const filteredData =
    filter === "all" ? body : body.filter((item) => item.status === filter);

  return (
    <DynamicPage
      headerFilters={
        <DynamicHeader
          title="requests"
          filterChildren={
            <FilterButtonsBox>
              {filterBtns.map(({ item, length }, index) => (
                <FilterButton
                  key={index}
                  index={index}
                  item={item}
                  length={length}
                  activeFilter={activeFilter}
                  handleClickEvent={handleBtnClickEvent}
                />
              ))}
            </FilterButtonsBox>
          }
          sortChildren={
            <Filter
              options={[
                { value: "weigth", label: "weigth" },
                { value: "status", label: "status" },
                { value: "date", label: "date" },
              ]}
            />
          }
        />
      }
      tableComponent={
        <DynamicTable<RequestBodyType>
          header={header}
          body={filteredData}
          gridColumns="1fr 2fr 1fr 1.5fr 1fr"
        />
      }
    />
  );
}
