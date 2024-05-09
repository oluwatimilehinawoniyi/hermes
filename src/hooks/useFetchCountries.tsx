import { useState, useEffect } from "react";

interface CountryData {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
  };
}

export default function useFetchCountries() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!isCancelled) {
          setCountries(data);
        }
      } catch (error: unknown) {
        if (!isCancelled) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred");
          }
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchCountries();
    return () => {
      isCancelled = true;
    };
  }, []);

  return { countries, isLoading, error };
}
