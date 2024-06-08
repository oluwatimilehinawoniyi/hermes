import ShowAll from "@components/UI/DashboardRelated/ShowAll/ShowAll";
import Table from "@components/UI/DashboardRelated/Table/Table";
import style from "./delayed.module.css";
import useTableFetcher from "@hooks/useTableFetcher";
import { getShipments } from "@api/index";
import { useEffect, useState } from "react";
import { ShipmentBodyType } from "src/types";

export default function DelayedDelivery() {
  const { data } = useTableFetcher<ShipmentBodyType>(getShipments);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transformedData = data.map((item) => ({
          destination: `${item.origin} - ${item.destination}`,
          truck: item.truck,
          arrival: new Date(item["expected arrival time"]).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          delay: item.delay,
        }));

        setTableData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sample = [
    {
      destination: "kaduna - lagos",
      truck: "b12345",
      arrival: "07:05 AM",
      delay: "5:05h",
    },
    {
      destination: "yobe - ekiti",
      truck: "b56789",
      arrival: "10:45 AM",
      delay: "2:05h",
    },
    {
      destination: "cross river - abuja",
      truck: "b12645",
      arrival: "01:55 AM",
      delay: "0:30h",
    },
    {
      destination: "lagos - edo",
      truck: "b37845",
      arrival: "08:56 AM",
      delay: "1:05h",
    },
  ];

  const headers = ["destination", "truck", "arrival", "delay"];

  return (
    <div className={style.delayedDelivery}>
      <div className={style.header}>
        <h1>Delayed Delivery</h1>
        <ShowAll to="shipment" />
      </div>

      {/* <Table headers={deliveryData.headers} data={deliveryData.data} /> */}
      <Table headers={headers} data={sample} />
    </div>
  );
}
