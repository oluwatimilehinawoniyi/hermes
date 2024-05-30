import Section from "@components/UI/Section/Section";
import styles from "./associates.module.css";
import CountriesCarousel from "./CountriesCarousel";

export default function Associates() {
  return (
    <Section>
      <div className={styles.associates}>
        <div className={styles.associateText}>
          <h1>
            we serve <br /> more than <br /> <span>50+ countries</span>
          </h1>
          <p>
         Our extensive network ensures that we can
            handle every logistics needs no matter the location. We are
            committed to delivering excellence and reliability, making us a
            trusted partner in the logistics industry.
          </p>
        </div>
        <div className={styles.associateCarousel}>
          <CountriesCarousel />
        </div>
      </div>
    </Section>
  );
}
