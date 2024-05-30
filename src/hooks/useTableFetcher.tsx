import { useState, useEffect } from "react";

export default function useTableFetcher<T>(fetchDataFunc: () => Promise<T[]>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result: T[] = await fetchDataFunc();
        setData(result);
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

    fetchdata();
  }, [fetchDataFunc]);

  return { data, loading, error };
}
