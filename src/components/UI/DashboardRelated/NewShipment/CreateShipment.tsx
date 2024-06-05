import Button from "@components/UI/Button/Button";
import styles from "./newShipment.module.css";
import useModal from "@hooks/useModal";
import supabase from "@utils/supabase";
import FormInput from "@components/UI/Form/FormInput";
import { useState } from "react";
import ButtonContent from "../SVGMorph/SVGMorph";
import Truck from "@components/UI/Truck/Truck";
import VehicleDropdown from "../VehicleDropDown/VehicleDropDown";

interface NewShipment {
  truckId: string;
  truckNumber: string;
  origin: string;
  destination: string;
  weight: string;
  status: "pending" | "in transit" | "completed";
  departureTime: Date;
  expectedArrivalTime: Date;
  actualArrivalTime: Date | null;
  delay: string;
}

interface Vehicle {
  id: string;
  truck_model: string;
  truck_number: string;
  capacity: number;
}

export default function CreateShipment() {
  const [status, setStatus] = useState({
    loading: false,
    done: false,
    failed: false,
  });
  const [newShipment, setNewShipment] = useState<NewShipment>({
    truckId: "",
    truckNumber: "",
    origin: "",
    destination: "",
    weight: "",
    status: "pending",
    departureTime: new Date(),
    expectedArrivalTime: new Date(),
    actualArrivalTime: null,
    delay: "",
  });

  const { toggleNSModal } = useModal();

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setNewShipment({
      ...newShipment,
      truckId: vehicle.id,
      truckNumber: vehicle.truck_number,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "datetime-local") {
      setNewShipment((prevState) => ({
        ...prevState,
        [name]: new Date(value),
      }));
    } else {
      setNewShipment((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleShipmentCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      ...newShipment,
      departureTime: newShipment.departureTime.toISOString(),
      expectedArrivalTime: newShipment.expectedArrivalTime.toISOString(),
      actualArrivalTime: newShipment.actualArrivalTime
        ? newShipment.actualArrivalTime.toISOString()
        : null,
    };

    setStatus({ loading: true, done: false, failed: false });
    const { error } = await supabase.from("shipments").insert([dataToSend]);

    if (error) {
      console.log(error);
      setStatus({ loading: false, done: false, failed: true });
    } else {
      setStatus({ loading: false, done: true, failed: false });
      setTimeout(toggleNSModal, 5000);
    }
  };

  return (
    <section className={styles.newShipment}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p>create shipment</p>
        </div>
        <div className={styles.form}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "50%",
              }}
            >
              <div>
                <VehicleDropdown onSelect={handleVehicleSelect} />
              </div>
            </div>
            <div
              style={{
                width: "50%",
              }}
            >
              <Truck loadWidth={0} />
            </div>
          </div>
          <form action="" onSubmit={handleShipmentCreation}>
            <div className={styles.shipment_Route_Timing}>
              <FormInput
                type="text"
                id="origin"
                label="Origin"
                placeholder="Lagos"
                required
                value={newShipment.origin}
                onChange={(e) =>
                  setNewShipment({ ...newShipment, origin: e.target.value })
                }
              />

              <FormInput
                type="text"
                id="destination"
                label="Destination"
                placeholder="Enugu"
                required
                value={newShipment.destination}
                onChange={(e) =>
                  setNewShipment({
                    ...newShipment,
                    destination: e.target.value,
                  })
                }
              />

              <FormInput
                type="datetime-local"
                id="departureTime"
                label="Departure Time"
                required
                value={(newShipment.departureTime || "")
                  .toISOString()
                  .slice(0, 16)}
                onChange={handleChange}
              />

              <FormInput
                type="datetime-local"
                id="expectedArrivalTime"
                label="Expected Arrival Time"
                required
                value={(newShipment.expectedArrivalTime || "")
                  .toISOString()
                  .slice(0, 16)}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className={styles.footer}>
          <Button backgroundColor="var(--danger)" fn={toggleNSModal}>
            cancel
          </Button>
          <Button backgroundColor="var(--primary)" type="submit">
            {status.loading ? (
              <ButtonContent status={{ loading: true }} />
            ) : status.done ? (
              <ButtonContent status={{ done: true }} />
            ) : (
              <ButtonContent status={{}} />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
