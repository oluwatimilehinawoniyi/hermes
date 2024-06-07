/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequests } from "@api/requests";
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
import { RequestBodyType } from "src/types";

export default function Requests() {
  const [requests, setRequests] = useState<RequestBodyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const header = ["destination", "weight", "request date", "status"];

  const filterBtns = [
    { item: "all", length: requests.length },
    ...["approved", "denied", "pending"].map((status) => ({
      item: status,
      length: requests.filter((item) => item.status === status).length,
    })),
  ];

  const [filter, setFilter] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    async function fetchRequests() {
      setIsLoading(true);
      try {
        const { data, error } = await getRequests();
        if (error) {
          setError(error.message);
        } else {
          setRequests(data || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRequests();
  }, []);

  function handleSortOptionChange(value: string) {
    setSortOption(value);
  }

  function handleBtnClickEvent(index: number) {
    setActiveFilter(index);
    setFilter(filterBtns[index].item);
  }

  const recomposedData = requests.map((item) => {
    const { "request date": requestDate, ...rest } = item;
    return {
      ...rest,
      destination: `${item.origin} - ${item.destination}`,
      "request date": formatDateTime(requestDate),
    };
  });

  const filteredData =
    filter === "all"
      ? recomposedData
      : recomposedData.filter((item) => item.status === filter);

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
      searchBarComponent={<SearchBar placeHolder="Search by request id" />}
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
        isLoading || requests === null ? (
          <p>Loading requests...</p>
        ) : error ? (
          <p>Error loading requests: {error}</p>
        ) : (
          <DynamicTable<RequestBodyType>
            header={header}
            body={sortedData}
            statuses={["approved", "pending"]}
            gridColumns="1.5fr 1fr 1.5fr 1fr"
          />
        )
      }
    />
  );
}
