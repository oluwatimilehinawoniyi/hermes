import Button from "@components/UI/Button/Button";
import Section from "@components/UI/Section/Section";
import styles from "./cta.module.css";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <Section backgroundColor="var(--primary)">
      <div className={styles.cta}>
        <h1>It's your time to make the impact you've always dreamed of</h1>
        <Button backgroundColor="white">
          <Link to="/auth">get started</Link>
        </Button>
      </div>
    </Section>
  );
}
