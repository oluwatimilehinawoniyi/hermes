import Button from "@components/UI/Button/Button";
import styles from "./newShipment.module.css";
import useModal from "@hooks/useModal";
import supabase from "@utils/supabase";
import FormInput from "@components/UI/Form/FormInput";
import { useState } from "react";
import ButtonContent from "../SVGMorph/SVGMorph";
import Truck from "@components/UI/Truck/Truck";
import VehicleDropdown from "../VehicleDropDown/VehicleDropDown";
import { RadioStatusSelector } from "../RadioButton/RadioButton";

interface NewShipment {
  truck_id: string;
  origin: string;
  destination: string;
  status: "pending" | "in transit" | "completed";
  departure_time: string;
  expected_arrival_time: string;
  actual_arrival_time: string | null;
  delay: string | null;
}

interface Vehicle {
  id: string;
  truck_model: string;
  truck_number: string;
  capacity: number;
}

export default function CreateShipment() {
  const [radiostatus, setRadioStatus] = useState<string>("pending");
  const [status, setStatus] = useState({
    loading: false,
    done: false,
    failed: false,
  });

  const [newShipment, setNewShipment] = useState<NewShipment>({
    truck_id: "",
    origin: "",
    destination: "",
    status: "pending",
    departure_time: new Date().toISOString().slice(0, 16),
    expected_arrival_time: new Date().toISOString().slice(0, 16),
    actual_arrival_time: null,
    delay: null,
  });

  const { toggleNSModal } = useModal();

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setNewShipment({
      ...newShipment,
      truck_id: vehicle.id,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "datetime-local") {
      setNewShipment((prevState) => ({
        ...prevState,
        [name]: value,
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
      departure_time: new Date(newShipment.departure_time).toISOString(),
      expected_arrival_time: new Date(newShipment.expected_arrival_time).toISOString(),
      actual_arrival_time: newShipment.actual_arrival_time
        ? new Date(newShipment.actual_arrival_time).toISOString()
        : null,
      delay: newShipment.delay || null,
      status: radiostatus,
    };

    setStatus({ loading: true, done: false, failed: false });
    const { error } = await supabase.from("shipments").insert([dataToSend]);

    if (error) {
      console.log(error);
      setStatus({ loading: false, done: false, failed: true });
    } else {
      setStatus({ loading: false, done: true, failed: false });
      console.log(dataToSend);
      setTimeout(toggleNSModal, 1500);
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
                id="departure_time"
                name="departure_time"
                label="Departure Time"
                required
                value={newShipment.departure_time}
                onChange={handleChange}
              />

              <FormInput
                type="datetime-local"
                id="expected_arrival_time"
                name="expected_arrival_time"
                label="Expected Arrival Time"
                required
                value={newShipment.expected_arrival_time}
                onChange={handleChange}
              />
            </div>

            <div
              style={{
                width: "100%",
                marginBlock: "1rem",
              }}
            >
              <RadioStatusSelector
                data={["pending", "in transit", "completed"]}
                status={radiostatus}
                setStatus={setRadioStatus}
              />
            </div>
          </form>
          <div className={styles.footer}>
            <Button backgroundColor="var(--danger)" fn={toggleNSModal}>
              cancel
            </Button>
            <Button
              backgroundColor="var(--primary)"
              type="submit"
              fn={handleShipmentCreation}
            >
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
      </div>
    </section>
  );
}
