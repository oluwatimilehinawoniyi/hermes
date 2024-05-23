import style from "@assets/styles/dashboard/app.module.css";
import AvailableTrucks from "@components/layouts/Dashboard/AvailableTrucks/AvailableTrucks";
import DelayedDelivery from "@components/layouts/Dashboard/DelayedDelivery/DelayedDelivery";
import DashboardCard from "@components/UI/DashboardRelated/Card/DashboardCard";
import OverviewStatItem from "@components/UI/DashboardRelated/OverviewStats/OverviewStatItem";
import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";
import { Container, Package, PackageCheck, Truck } from "lucide-react";

export default function AppHome() {
  const overviewStats = [
    {
      title: "new packages",
      stats: 222,
      icon: Package,
      colour: "var(--purple)",
    },
    {
      title: "ready for shipping",
      stats: 60,
      icon: Container,
      colour: "var(--primary)",
    },
    {
      title: "in transit",
      stats: 2067,
      icon: Truck,
      colour: "var(--warning)",
    },
    {
      title: "delivered",
      stats: 3600,
      icon: PackageCheck,
      colour: "var(--primary)",
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
            colour={stat.colour}
          />
        ))}
      </div>
      <DashboardCard className={style.cardOne}>
        <DelayedDelivery />
      </DashboardCard>
      <DashboardCard className={style.cardTwo}>2</DashboardCard>
      <DashboardCard className={style.cardThree}>
        <AvailableTrucks />
      </DashboardCard>
      <DashboardCard className={style.cardFour}>4</DashboardCard>
    </section>
  );
}
