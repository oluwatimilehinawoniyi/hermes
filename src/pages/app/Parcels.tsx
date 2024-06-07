/* eslint-disable @typescript-eslint/no-explicit-any */
import { getParcels } from "@api/parcels";
import DynamicPage, {
  DynamicHeader,
  DynamicTable,
  FilterButton,
  FilterButtonsBox,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import Filter from "@components/UI/DashboardRelated/Filter/Filter";
import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";
import { useEffect, useState } from "react";

interface ParcelBodyInfo {
  id: string;
  "tracking id": string;
  status: string;
  weight: number;
  origin: string;
  destination: string;
}

export default function Parcels() {
  const [parcels, setParcels] = useState<ParcelBodyInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const header = ["tracking id", "origin", "destination", "weight", "status"];

  const body = parcels?.map((item) => ({
    id: item.id,
    "tracking id": item.id,
    origin: item.origin,
    destination: item.destination,
    weight: item.weight,
    status: item.status,
  }));

  useEffect(() => {
    async function fetchParcels() {
      setIsLoading(true);
      const { data, error } = await getParcels();

      if (error) {
        setError(error.message);
      } else {
        setParcels(data || []);
      }

      setIsLoading(false);
    }

    fetchParcels();
  }, []);

  const filterBtns = [
    { item: "all", length: body.length },
    ...["delivered", "on way", "delayed", "not assigned"].map((status) => ({
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
    }
    return 0;
  });

  return (
    <DynamicPage
      searchBarComponent={
        <SearchBar placeHolder="Search by tracking number or client id" />
      }
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
                { value: "weight", label: "weight" },
                { value: "status", label: "status" },
              ]}
              onOptionChange={handleSortOptionChange}
            />
          }
        />
      }
      tableComponent={
        isLoading || parcels === null ? (
          <p>Loading parcels...</p>
        ) : error ? (
          <p>Error loading parcels: {error}</p>
        ) : (
          <DynamicTable<ParcelBodyInfo>
            header={header}
            body={sortedData}
            statuses={["delivered", "on way", "delayed"]}
            gridColumns="1fr 1.5fr 1.5fr 1fr 1fr"
          />
        )
      }
    />
  );
}
