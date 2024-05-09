import Button from "@components/UI/Button/Button";
import Logo from "@components/UI/Logo/Logo";
import styles from "./navigation.module.css";

export default function NavigationBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoHolder}>
        <Logo />
        <h3>| internal</h3>
      </div>

      <div>
        <Button>login</Button>
      </div>
    </nav>
  );
}
