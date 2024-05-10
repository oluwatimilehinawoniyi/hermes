import Section from "@components/UI/Section/Section";
import useFetchCountries from "@hooks/useFetchCountries";
import styles from "./countries.module.css";

export default function CountriesCarousel() {
  const { countries, error, isLoading } = useFetchCountries();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Section>
      <div className={styles.countriesHolder}>
        {Array.from({ length: 3 }, (_, index) => {
          const sliceIndex = 8;
          const startIndex = index * sliceIndex;
          const endIndex = startIndex + sliceIndex;
          return (
            <div>
              <div className={styles.countries}>
                {countries.slice(startIndex, endIndex).map((country, index) => (
                  <Country
                    key={index}
                    flag={country.flags.png}
                    name={country.name.common}
                    alt={country.flags.alt}
                  />
                ))}
              </div>
              <div className={styles.countries}>
                {countries.slice(startIndex, endIndex).map((country, index) => (
                  <Country
                    key={index}
                    flag={country.flags.png}
                    name={country.name.common}
                    alt={country.flags.alt}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Country({
  alt,
  flag,
  name,
}: {
  alt: string;
  name: string;
  flag: string;
}) {
  return (
    <div className={styles.country}>
      <span>
        <img src={flag} alt={alt} />
      </span>
      <h3>{name}</h3>
    </div>
  );
}
