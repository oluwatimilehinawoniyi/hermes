/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicPage, {
  DynamicHeader,
  DynamicTable,
  FilterButton,
  FilterButtonsBox,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import Filter from "@components/UI/DashboardRelated/Filter/Filter";
import data from "@data/parcelData.json";
import { transformData, validateStatus } from "@utils/TransformData";
import { useState } from "react";

import { ParcelBodyType } from "src/types";

const validParcelStatuses: ReadonlyArray<
  "delivered" | "on way" | "delayed" | "not assigned"
> = ["delivered", "on way", "delayed", "not assigned"];

const transformedData = transformData<ParcelBodyType>(data.body, (status) =>
  validateStatus(status, validParcelStatuses)
);

export default function Parcels() {
  const { header, body } = { header: data.header, body: transformedData };

  const filterBtns = [
    { item: "all", length: body.length },
    ...["delivered", "on way", "delayed", "not assigned"].map((status) => ({
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
          title="parcels"
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
                { value: "destination", label: "destination" },
              ]}
            />
          }
        />
      }
      tableComponent={
        <DynamicTable<ParcelBodyType>
          header={header}
          body={filteredData}
          gridColumns="1fr 1fr 1fr 1.5fr 1.5fr 1fr 1fr"
        />
      }
    />
  );
}
