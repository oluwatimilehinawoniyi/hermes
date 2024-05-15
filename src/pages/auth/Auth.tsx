import styles from "@assets/styles/login.module.css";
import Logo from "@components/UI/Logo/Logo";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <section className={styles.loginPage}>
      <AuthLeaf />
      <DesignLeaf />
    </section>
  );
}

function AuthLeaf() {
  return (
    <div>
      <Logo />
      <Outlet />
    </div>
  );
}

function DesignLeaf() {
  return <div></div>;
}