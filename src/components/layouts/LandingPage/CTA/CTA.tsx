import Button from "@components/UI/Button/Button";
import Section from "@components/UI/Section/Section";
import styles from "./cta.module.css";

export default function CallToAction() {
  return (
    <Section backgroundColor="var(--primary)">
      <div className={styles.cta}>
        <h1>It's your time to make the impact you've always dreamed ofS</h1>
        <Button backgroundColor="white">login now</Button>
      </div>
    </Section>
  );
}
