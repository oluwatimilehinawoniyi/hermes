/* eslint-disable @typescript-eslint/no-explicit-any */
import { getClients } from "@api/clients";
import DynamicPage, {
  DynamicHeader,
  DynamicTable,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";
import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";
import { useEffect, useState } from "react";
import { ClientBodyType } from "src/types";

export default function Clients() {
  const [clients, setClients] = useState<ClientBodyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const header = ["name", "email", "phone", "address", "status"];

  useEffect(() => {
    async function fetchClients() {
      setIsLoading(true);
      try {
        const { data, error } = await getClients();
        if (error) {
          setError(error.message);
        } else {
          setClients(data || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchClients();
  }, []);

  return (
    <DynamicPage
      searchBarComponent={<SearchBar placeHolder="Search by client id" />}
      headerFilters={<DynamicHeader title="clients" />}
      tableComponent={
        isLoading || clients === null ? (
          <p>Loading clients...</p>
        ) : error ? (
          <p>Error loading clients: {error}</p>
        ) : (
          <DynamicTable<ClientBodyType>
            header={header}
            body={clients}
            gridColumns="1.5fr 2fr 1.5fr 2fr 1fr"
          />
        )
      }
    />
  );
}
