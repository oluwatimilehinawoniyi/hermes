import ShowAll from "@components/UI/DashboardRelated/ShowAll/ShowAll";
import style from "./available.module.css";

export default function AvailableTrucks() {
  const availableTrucksData = [
    {
      truckId: "v567985",
      from: "barcelona",
      to: "madrid",
      capacity: 90,
    },
    {
      truckId: "s586467",
      from: "barcelona",
      to: "getafe",
      capacity: 50,
    },
    {
      truckId: "b276828",
      from: "barcelona",
      to: "seville",
      capacity: 25,
    },
  ];
  return (
    <section className={style.availableTrucks}>
      <div className={style.header}>
        <h1>available trucks</h1>
        <ShowAll to="shipment" />
      </div>

      <div className="">
        {availableTrucksData.map(({ truckId, from, to, capacity }) => (
          <AvailableTruck
            key={truckId}
            truckId={truckId}
            from={from}
            to={to}
            capacity={capacity}
          />
        ))}
      </div>
    </section>
  );
}

function AvailableTruck({
  truckId,
  from,
  to,
  capacity,
}: {
  truckId: string;
  from: string;
  to: string;
  capacity: number;
}) {
  return (
    <div className={style.availableTruck}>
      <div className={style.truckId}>
        <h2>{truckId}</h2>
        <p>
          {from} - {to}
        </p>
      </div>
      <div className={style.truckCapacity}>
        <p>
          <span
            style={{
              color:
                capacity < 50
                  ? "var(--primary)"
                  : capacity >= 50 && capacity <= 75
                  ? "var(--warning)"
                  : "var(--danger)",
            }}
          >
            {capacity}
          </span>{" "}
          / 100 %
        </p>
        <div className={style.progressTrack}>
          <div
            className={style.progressBar}
            style={{
              width: `${capacity}%`,
              backgroundColor:
                capacity < 50
                  ? "var(--primary)"
                  : capacity >= 50 && capacity <= 75
                  ? "var(--warning)"
                  : "var(--danger)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
