import { Outlet } from "react-router-dom";
import style from "@assets/styles/dashboard.module.css";
import Sidebar from "@components/layouts/Dashboard/Sidebar/Sidebar";
import useModal from "@hooks/useModal";
import Modal from "@components/layouts/Dashboard/Modal/Modal";
import CreateShipment from "@components/UI/DashboardRelated/NewShipment/CreateShipment";

export default function Dashboard() {
  const { isOpen } = useModal();
  return (
    <section className={style.dashboard}>
      <section className={style.sidebarHolder}>
        <Sidebar />
      </section>

      <div
        className={style.mainContent}
        style={{
          height: isOpen ? "100vh" : undefined,
          overflowY: isOpen ? "hidden" : undefined,
        }}
      >
        <Outlet />
      </div>
      {isOpen && (
        <Modal>
          <CreateShipment />
        </Modal>
      )}
    </section>
  );
}
