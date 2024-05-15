import Section from "@components/UI/Section/Section";
import styles from "./footer.module.css";
import Logo from "@components/UI/Logo/Logo";

export default function Footer() {
  return (
    <Section>
      <footer className={styles.footer}>
        <div>
          <Logo />
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
