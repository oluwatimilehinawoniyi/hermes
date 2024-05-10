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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
            dolor praesentium facere temporibus nam minus.
          </p>
        </div>
        <div className={styles.associateCarousel}>
          <CountriesCarousel />
        </div>
      </div>
    </Section>
  );
}
