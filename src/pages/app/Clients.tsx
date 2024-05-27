import DynamicPage, {
  DynamicHeader,
  DynamicTable,
  FilterButton,
  FilterButtonsBox,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import Filter from "@components/UI/DashboardRelated/Filter/Filter";
import data from "@data/clientsData.json";
import { transformData, validateStatus } from "@utils/TransformData";
import { useState } from "react";
import { ClientBodyType } from "src/types";

const validClientStatuses: ReadonlyArray<"active" | "inactive"> = [
  "active",
  "inactive",
];

const transformedData = transformData<ClientBodyType>(data.body, (status) =>
  validateStatus(status, validClientStatuses)
);
export default function Clients() {
  const { header, body } = { header: data.header, body: transformedData };

  const filterBtns = [
    { item: "all", length: body.length },
    ...["active", "inactive"].map((status) => ({
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
          title="clients"
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
            <Filter options={[{ value: "status", label: "status" }]} />
          }
        />
      }
      tableComponent={
        <DynamicTable<ClientBodyType>
          header={header}
          body={filteredData}
          gridColumns="1fr 1.5fr 2fr 1.5fr 2fr 1fr"
        />
      }
    />
  );
}
