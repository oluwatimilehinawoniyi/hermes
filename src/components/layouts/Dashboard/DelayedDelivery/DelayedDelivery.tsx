import ShowAll from "@components/UI/DashboardRelated/ShowAll/ShowAll";
import Table from "@components/UI/DashboardRelated/Table/Table";
import style from "./delayed.module.css";
// import useTableFetcher from "@hooks/useTableFetcher";
// import { getShipments } from "@api/shipments";

export default function DelayedDelivery() {
  // const { data } = useTableFetcher(getShipments);

  // console.log(data.filter((item) => item.status === "delayed"));

  const deliveryData = {
    headers: ["destination", "truck", "arrival", "delay"],
    data:
      //  data.filter((item) => item.status === "delayed"),
      [
        ["valencia - barcelona", "b12345", "07:05 AM", "5:05h"],
        ["granada - barcelona", "b56789", "10:45 AM", "2:05h"],
        ["madrid - barcelona", "b12645", "01:55 AM", "0:30h"],
        ["seville - barcelona", "b37845", "08:56 AM", "1:05h"],
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
