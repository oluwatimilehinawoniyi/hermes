import { Outlet } from "react-router-dom";
import style from "@assets/styles/dashboard.module.css";
import Sidebar from "@components/layouts/Dashboard/Sidebar/Sidebar";
import useModal from "@hooks/useModal";
import Modal from "@components/layouts/Dashboard/Modal/Modal";
import CreateShipment from "@components/UI/DashboardRelated/NewShipment/CreateShipment";
import CreateVehicle from "@components/UI/DashboardRelated/NewVehicle/NewVehicle";

export default function Dashboard() {
  const { isNSOpen, isNVOpen } = useModal();
  return (
    <section className={style.dashboard}>
      {/* view warning */}
      <div className={style.mobileWarning}>
        <p>For the best experience, please use a desktop browser.</p>
      </div>
      {/* view warning */}
      
      <div className={style.dashboardPage}>
        <section className={style.sidebarHolder}>
          <Sidebar />
        </section>

        <div
          className={style.mainContent}
          style={{
            height: isNVOpen || isNSOpen ? "100vh" : undefined,
            overflowY: isNVOpen || isNSOpen ? "hidden" : undefined,
          }}
        >
          <Outlet />
        </div>
        {isNSOpen && (
          <Modal>
            <CreateShipment />
          </Modal>
        )}
        {isNVOpen && (
          <Modal>
            <CreateVehicle />
          </Modal>
        )}
      </div>
    </section>
  );
}
