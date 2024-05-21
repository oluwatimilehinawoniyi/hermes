import { Outlet } from "react-router-dom";
import style from "@assets/styles/dashboard.module.css";
import Sidebar from "@components/layouts/Dashboard/Sidebar/Sidebar";
import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";

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
          height: "100%",
          width: "82%",
          backgroundColor: "var(--line-colour)",
          padding: "1rem",
        }}
      >
        <SearchBar />
        <Outlet />
      </section>
    </section>
  );
}
