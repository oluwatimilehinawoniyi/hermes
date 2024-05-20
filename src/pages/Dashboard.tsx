import { Outlet } from "react-router-dom";
import Sidebar from "./app/Sidebar";

export default function Dashboard() {
  return (
    <section>
      <Sidebar />
      <Outlet />
    </section>
  );
}
