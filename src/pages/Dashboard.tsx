import { Outlet } from "react-router-dom";
import style from "@assets/styles/dashboard.module.css";
import Sidebar from "@components/layouts/Dashboard/Sidebar/Sidebar";
// import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";

export default function Dashboard() {
  return (
    <section className={style.dashboard}>
      <section className={style.sidebarHolder}>
        <Sidebar />
      </section>

      <div className={style.mainContent}>
        <Outlet />
      </div>
    </section>
  );
}
