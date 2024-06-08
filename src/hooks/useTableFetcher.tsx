import { useState, useEffect } from "react";

// Define the type for the fetched data
interface FetchResult<T> {
  data: T[] | null;
  error: string | null;
}

export default function useTableFetcher<T>(
  fetchDataFunc: () => Promise<FetchResult<T>>
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataFunc();
        if (result.error) {
          setError(result.error);
        } else {
          setData(result.data || []);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchDataFunc]);

  return { data, loading, error };
}
