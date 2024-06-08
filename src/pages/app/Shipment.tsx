/* eslint-disable @typescript-eslint/no-explicit-any */
import { getShipments } from "@api/shipments";
import Available from "@components/layouts/Dashboard/AvailableTrucks/PageComponent/Available";
import DynamicPage, {
  DynamicHeader,
  DynamicTable,
  FilterButton,
  FilterButtonsBox,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import Filter from "@components/UI/DashboardRelated/Filter/Filter";
import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";
import formatDateTime from "@utils/formatDate";
import { useEffect, useState } from "react";
import { ShipmentBodyType } from "src/types";

export default function Shipment() {
  const [shipments, setShipments] = useState<ShipmentBodyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const header = [
    "truck",
    "capacity",
    "origin",
    "destination",
    "departure date",
    "expected arrival time",
    "status",
    "delay",
  ];

  const body = shipments.map((item) => {
    const {
      "departure date": departureDate,
      "expected arrival time": expectedDate,
      ...rest
    } = item;
    return {
      ...rest,
      id: item.id,
      truck: item.truck,
      capacity: item.capacity,
      origin: item.origin,
      destination: item.destination,
      status: item.status,
      "departure date": formatDateTime(departureDate),
      "expected arrival time": formatDateTime(expectedDate),
      delay: item.delay || "-",
    };
  });

  const filterBtns = [
    { item: "all", length: body.length },
    ...["pending", "in transit", "completed", "available"].map((status) => {
      if (status !== "available") {
        return {
          item: status,
          length: body.filter((item) => item.status === status).length,
        };
      } else {
        return {
          item: status,
          length: body.filter((item) => item.status === "pending").length,
        };
      }
    }),
  ];

  const [filter, setFilter] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<number>(4);
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    async function fetchShipments() {
      setIsLoading(true);
      try {
        const { data, error } = await getShipments();
        console.log(data);

        if (error) {
          setError(error.message);
        } else {
          setShipments(data || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchShipments();
  }, []);

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
      return a.capacity - b.capacity;
    } else if (sortOption === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  error && <p>Error loading shipments: {error}</p>;
  isLoading || (shipments === null && <p>Loading shipments...</p>);

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
              {filterBtns.map(({ item, length }, index) =>
                item !== "available" ? (
                  <FilterButton
                    key={index}
                    index={index}
                    item={item}
                    length={length}
                    activeFilter={activeFilter}
                    handleClickEvent={handleBtnClickEvent}
                  />
                ) : (
                  <FilterButton
                    item="available"
                    length={length}
                    activeFilter={activeFilter}
                    handleClickEvent={handleBtnClickEvent}
                    index={index}
                    key={index}
                  />
                )
              )}
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
        activeFilter !== 4 ? (
          <DynamicTable<ShipmentBodyType>
            header={header}
            body={sortedData}
            statuses={["pending", "in transit", "available"]}
            gridColumns="1fr .8fr .6fr .8fr 1fr 1.5fr 1fr .4fr"
          />
        ) : (
          <Available
            availableTruckData={shipments.filter(
              (item) => item.status === "pending"
            )}
          />
        )
      }
    />
  );
}
