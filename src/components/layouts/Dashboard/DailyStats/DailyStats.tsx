import { PieChart } from "@mui/x-charts/PieChart";
import style from "./daily.module.css";
import { Expand } from "lucide-react";

export default function DailyStats() {
  return (
    <section className={style.dailyStats}>
      <div className={style.header}>
        <h1>daily activity</h1>
        <Expand size={18} />
      </div>
      <div className={style.chartHolder}>
        <ChartInfo />
        <div
          style={{
            width: "50%",
            display: "grid",
            placeContent: "center",
            // border: "1px solid red",
            position: "relative",
          }}
        >
          <DailyChart />
        </div>
      </div>
    </section>
  );
}

function ChartInfo() {
  return (
    <div className={style.chartInfo}>
      <div>
        <p
          style={{
            color: "var(--danger)",
            fontWeight: "var(--font-medium)",
          }}
        >
          shipments processed
        </p>
        <p>
          <span>1010</span> / 2020
        </p>
      </div>
      <div>
        <p
          style={{
            color: "var(--warning)",
            fontWeight: "var(--font-medium)",
          }}
        >
          orders processed
        </p>
        <p>
          <span>650</span> / 1300
        </p>
      </div>
      <div>
        <p
          style={{
            color: "var(--purple)",
            fontWeight: "var(--font-medium)",
          }}
        >
          requests considered
        </p>
        <p>
          <span>10</span> / 20
        </p>
      </div>
    </div>
  );
}

function DailyChart() {
  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ];
  return (
    <PieChart
      colors={["var(--danger)", "var(--warning)", "var(--purple)"]}
      slotProps={{ legend: { hidden: true } }}
      series={[
        {
          data: [...data],
          innerRadius: 83,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 90,
          cx: 150,
          cy: 150,
        },
      ]}
      height={200}
      width={280}
    />
  );
}
