import style from "@assets/styles/dashboard/app.module.css";
import OverviewStatItem from "@components/UI/DashboardRelated/OverviewStats/OverviewStatItem";
import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";
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
      <div className={`${style.cardOne} ${style.card}`}>1</div>
      <div className={`${style.cardTwo} ${style.card}`}>2</div>
      <div className={`${style.cardThree} ${style.card}`}>3</div>
      <div className={`${style.cardFour} ${style.card}`}>4</div>
    </section>
  );
}
