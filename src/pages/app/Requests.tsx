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

  const filterBtns = [
    { item: "all", length: body.length },
    ...["accepted", "pending"].map((status) => ({
      item: status,
      length: body.filter((item) => item.status === status).length,
    })),
  ];

  const [filter, setFilter] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("");

  function handleSortOptionChange(value: string) {
    setSortOption(value);
  }

  function handleBtnClickEvent(index: number) {
    setActiveFilter(index);
    setFilter(filterBtns[index].item);
  }

  const filteredData =
    filter === "all" ? body : body.filter((item) => item.status === filter);

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOption === "weight") {
      return a["weight"] - b["weight"];
    } else if (sortOption === "status") {
      return a.status.localeCompare(b.status);
    } else if (sortOption === "request date") {
      return Date.parse(a["request date"]) - Date.parse(b["request date"]);
    }
    return 0;
  });

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
                { value: "weight", label: "weight" },
                { value: "status", label: "status" },
                { value: "date", label: "date" },
              ]}
              onOptionChange={handleSortOptionChange}
            />
          }
        />
      }
      tableComponent={
        <DynamicTable<RequestBodyType>
          header={header}
          body={sortedData}
          gridColumns="1fr 2fr 1fr 1.5fr 1fr"
        />
      }
    />
  );
}
