import { useState, useEffect } from "react";
import ShowAll from "@components/UI/DashboardRelated/ShowAll/ShowAll";
import { Package, Truck } from "lucide-react";
import style from "./requests.module.css";
import { getRequests } from "@api/index";
import { RequestBodyType } from "src/types";
import useTableFetcher from "@hooks/useTableFetcher";

interface RequestsType {
  id: string;
  from: string;
  title: string;
  to: string;
  time: number;
  category: string;
  colour: string;
}

export default function Requests() {
  const { data: requestData } = useTableFetcher<RequestBodyType>(getRequests);

  const [requests, setRequests] = useState<RequestsType[]>([]);

  const getRandomRequests = (data: RequestBodyType[], numRequests: number) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numRequests).map((item) => {
      const { origin, destination } = item;
      const titles = ["parcel delivery", "parcel redirection"];
      const categories = ["machine", "parcel"];
      const times = [1, 20, 10, 15, 19];

      const title = titles[Math.floor(Math.random() * titles.length)];
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const time = times[Math.floor(Math.random() * times.length)];

      return {
        id: item.id,
        title: title,
        from: origin,
        to: destination,
        time: time,
        category: category,
        colour:
          title === "parcel delivery" ? "var(--primary)" : "var(--warning)",
      };
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(getRandomRequests(requestData, 3));
    }, 5000);

    setRequests(getRandomRequests(requestData, 3));

    return () => clearInterval(interval);
  }, [requestData]);

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
  time: number;
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
