import ShowAll from "@components/UI/DashboardRelated/ShowAll/ShowAll";
import { Package, Truck } from "lucide-react";
import style from "./requests.module.css";

export default function Requests() {
  const requests = [
    {
      id: 1,
      title: "parcel redirection",
      from: "valencia",
      to: "barcelona",
      time: "1",
      category: "parcel",
      colour: "var(--warning)",
    },
    {
      id: 2,
      title: "packing problem",
      from: "barcelona",
      to: "seville",
      time: "10",
      category: "parcel",
      colour: "var(--warning)",
    },
    {
      id: 3,
      title: "machine breakdown",
      from: "madrid",
      to: "barcelona",
      time: "20",
      category: "machine",
      colour: "var(--warning)",
    },
  ];
  return (
    <section className={style.requests}>
      <div className={style.header}>
        <h1>recent requests</h1>
        <ShowAll to="parcels" />
      </div>

      <div>
        {requests.map(({ id, from, category, time, title, to, colour }) => (
          <Request
            key={id}
            colour={colour}
            category={category}
            from={from}
            time={time}
            title={title}
            to={to}
          />
        ))}
      </div>
    </section>
  );
}

function Request({
  title,
  from,
  to,
  time,
  category,
  colour,
}: {
  title: string;
  from: string;
  to: string;
  time: string;
  category: string;
  colour: string;
}) {
  return (
    <div className={style.request}>
      <div>
        <span>
          {category === "parcel" ? (
            <Package fill={colour} />
          ) : (
            <Truck fill={colour} />
          )}
        </span>

        <div>
          <h3>{title}</h3>
          <p className={style.destination}>
            destination: <span>{from}</span> - <span>{to}</span>
          </p>
        </div>
      </div>
      <p>
        {time} {Number(time) <= 1 ? "min" : "mins"} ago
      </p>
    </div>
  );
}
