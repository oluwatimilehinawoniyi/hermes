import DashboardCard from "@components/UI/DashboardRelated/Card/DashboardCard";
import styles from "./available.module.css";
import Truck from "@components/UI/Truck/Truck";
import { ShipmentBodyType } from "src/types";
import { truckInfo } from "@utils/truckInfo";

export interface AvailableTruckType extends ShipmentBodyType {
  cargoesLoaded: number;
}

export default function Available({
  availableTruckData,
}: {
  availableTruckData: ShipmentBodyType[];
}) {
  const data: AvailableTruckType[] = availableTruckData.map((item) => ({
    ...item,
    cargoesLoaded: Math.floor(Math.random() * (item["weight (kg)"] + 1)),
  }));

  return (
    <section className={styles.availableTruckBox}>
      {data.map((truck, index) => (
        <DashboardCard key={index}>
          <div className={styles.availableTruck}>
            <div className={styles.header}>
              <span>
                <h1>{truck.destination}</h1>
                <p>{truck["arrival date"]}</p>
              </span>
              <p
                style={{
                  color: truckInfo({ truck }),
                }}
              >
                {Math.round((truck.cargoesLoaded / truck["weight (kg)"]) * 100)}
                %
              </p>
            </div>
            <div className={styles.truckInfo}>
              <div className={styles.truckInfoText}>
                <span>
                  <p>available Kg</p>
                  <p>
                    <span>{truck.cargoesLoaded}</span> / {truck["weight (kg)"]}
                  </p>
                </span>
                <span>
                  <p>shipment number</p>
                  <p>
                    <span>{truck.id}</span>
                  </p>
                </span>
                <span>
                  <p>truck</p>
                  <p>
                    <span>{truck.truck}</span>
                  </p>
                </span>
              </div>
              <div className={styles.truckBox}>
                <Truck
                  fillColor={truckInfo({ truck })}
                  loadWidth={Math.round(
                    (truck.cargoesLoaded / truck["weight (kg)"]) * 100
                  )}
                />
              </div>
            </div>
          </div>
        </DashboardCard>
      ))}
    </section>
  );
}
