import style from "@assets/styles/dashboard/app.module.css";
import DashboardCard from "@components/UI/DashboardRelated/Card/DashboardCard";
import OverviewStatItem from "@components/UI/DashboardRelated/OverviewStats/OverviewStatItem";
import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";
import ShowAll from "@components/UI/DashboardRelated/ShowAll/ShowAll";
import Table from "@components/UI/DashboardRelated/Table/Table";
import { Container, Package, PackageCheck, Truck } from "lucide-react";

export default function AppHome() {
  const overviewStats = [
    {
      title: "new packages",
      stats: 222,
      icon: Package,
    },
    {
      title: "ready for shipping",
      stats: 60,
      icon: Container,
    },
    {
      title: "in transit",
      stats: 2067,
      icon: Truck,
    },
    {
      title: "delivered",
      stats: 3600,
      icon: PackageCheck,
    },
  ];
  return (
    <section className={style.app}>
      <div className={style.searchBox}>
        <SearchBar />
      </div>
      <div className={style.header}>
        <h1>overview</h1>
      </div>
      <div className={style.overviewContainer}>
        {overviewStats.map((stat) => (
          <OverviewStatItem
            title={stat.title}
            icon={stat.icon}
            stat={stat.stats}
          />
        ))}
      </div>
      <DashboardCard className={style.cardOne}>
        <DelayedDelivery />
      </DashboardCard>
      <DashboardCard className={style.cardTwo}>2</DashboardCard>
      <DashboardCard className={style.cardThree}>3</DashboardCard>
      <DashboardCard className={style.cardFour}>4</DashboardCard>
    </section>
  );
}

function DelayedDelivery() {
  const deliveryData = {
    headers: ["destination", "truck", "arrival", "delay"],
    data: [
      ["valencia-barcelona", "b12345", "07:05 AM", "5:05h"],
      ["granada-barcelona", "b56789", "10:45 AM", "2:05h"],
      ["madrid-barcelona", "b12645", "01:55 AM", "0:30h"],
      ["seville-barcelona", "b37845", "08:56 AM", "1:05h"],
    ],
  };
  return (
    <div className={style.delayedDelivery}>
      <div className={style.header}>
        <h1>Delayed Delivery</h1>
        <ShowAll to="shipment" />
      </div>

      <Table headers={deliveryData.headers} data={deliveryData.data} />
    </div>
  );
}
