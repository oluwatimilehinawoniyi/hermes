import styles from "@assets/styles/auth.module.css";
import Logo from "@components/UI/Logo/Logo";
import { Outlet } from "react-router-dom";

export default function Auth() {
 
  return (
    <section className={styles.auth}>
      <AuthLeaf />
      <DesignLeaf />
    </section>
  );;
}

function AuthLeaf() {
  return (
    <div className={styles.authLeaf}>
      <div className={styles.authForm}>
        <div className={styles.logoHolder}>
          <Logo />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

function DesignLeaf() {
  return <div className={styles.designLeaf}></div>;
}
