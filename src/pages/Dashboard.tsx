import { Outlet } from "react-router-dom";
import style from "@assets/styles/dashboard.module.css";
import Sidebar from "@components/layouts/Dashboard/Sidebar/Sidebar";

export default function Dashboard() {
  return (
    <section className={style.dashboard}>
      <Sidebar />
      <Outlet />
    </section>
  );
}
