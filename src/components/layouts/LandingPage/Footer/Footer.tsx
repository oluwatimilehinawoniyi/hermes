import Section from "@components/UI/Section/Section";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <Section>
      <footer className={styles.footer}>
        <div>
          <h1>Hermes</h1>
        </div>
        <div>
          <ul>
            <li>terms</li>
            <li>policy</li>
            <li>contact</li>
          </ul>
          <p>
            &copy; {new Date().getFullYear()} Hermes Logistics. All rights
            reserved.
          </p>
        </div>
      </footer>
    </Section>
  );
}
