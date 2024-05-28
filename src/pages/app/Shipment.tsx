import DynamicPage, {
  DynamicHeader,
  DynamicTable,
  FilterButton,
  FilterButtonsBox,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import Filter from "@components/UI/DashboardRelated/Filter/Filter";
import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";
import data from "@data/shipmentData.json";
import { transformData, validateStatus } from "@utils/TransformData";
import { useState } from "react";
import { ShipmentBodyType } from "src/types";

const validShipmentStatuses: ReadonlyArray<"arrived" | "on way" | "delayed"> = [
  "arrived",
  "on way",
  "delayed",
];

const transformedData = transformData<ShipmentBodyType>(data.body, (status) =>
  validateStatus(status, validShipmentStatuses)
);

export default function Shipment() {
  const { header, body } = { header: data.header, body: transformedData };

  const filterBtns = [
    { item: "all", length: body.length },
    ...["arrived", "on way", "delayed"].map((status) => ({
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
      return a["weight (kg)"] - b["weight (kg)"];
    } else if (sortOption === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <DynamicPage
      searchBarComponent={
        <SearchBar placeHolder="Search by truck number or shipment id" />
      }
      headerFilters={
        <DynamicHeader
          title="shipments"
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
              ]}
              onOptionChange={handleSortOptionChange}
            />
          }
        />
      }
      tableComponent={
        <DynamicTable<ShipmentBodyType>
          header={header}
          body={sortedData}
          gridColumns="1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        />
      }
    />
  );
}
