import { Outlet } from "react-router-dom";
import style from "@assets/styles/dashboard.module.css";
import Sidebar from "@components/layouts/Dashboard/Sidebar/Sidebar";

export default function Dashboard() {
  return (
    <section className={style.dashboard}>
      <section
        style={{
          width: "18%",
        }}
      >
        <Sidebar />
      </section>
      <section
        style={{
          width: "82%",
          backgroundColor: "var(--line-colour)",
          padding: "1rem",
        }}
      >
        <Outlet />
      </section>
    </section>
  );
}
