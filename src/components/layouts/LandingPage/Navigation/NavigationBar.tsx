import Button from "@components/UI/Button/Button";
import Logo from "@components/UI/Logo/Logo";
import styles from "./navigation.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export default function NavigationBar() {
  const { user } = useAuth();
  return (
    <nav className={styles.nav}>
      <div className={styles.logoHolder}>
        <Logo />
        <h3>| internal</h3>
      </div>
      <div>
        <Button>
          {user ? (
            <Link to="/dashboard">go to dashboard</Link>
          ) : (
            <Link to="/auth">get started</Link>
          )}
        </Button>
      </div>
    </nav>
  );
}
