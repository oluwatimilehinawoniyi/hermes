import Button from "@components/UI/Button/Button";
import styles from "./newShipment.module.css";
import useModal from "@hooks/useModal";
import supabase from "@utils/supabase";
import FormInput from "@components/UI/Form/FormInput";
import { useState } from "react";
import ButtonContent from "../SVGMorph/SVGMorph";

export default function CreateShipment() {
  const [status, setStatus] = useState({
    loading: false,
    done: false,
    failed: false,
  });
  const [newShipment, setNewShipment] = useState({
    truckNumber: "",
    origin: "",
    destination: "",
    weight: "",
  });

  const { toggleModal } = useModal();
  const handleShipmentCreation = async () => {
    setStatus({ loading: true, done: false, failed: false });
    const { error } = await supabase.from("vehicles").insert({
      truck_number: newShipment.truckNumber,
      origin: newShipment.origin,
      destination: newShipment.destination,
      weight: newShipment.weight ? parseInt(newShipment.weight) : null,
    });

    if (error) {
      console.log(error);
      setStatus({ loading: false, done: false, failed: true });
    } else {
      setStatus({ loading: false, done: true, failed: false });
      setTimeout(toggleModal, 5000);
    }
  };

  return (
    <section className={styles.newShipment}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p>create shipment</p>
        </div>
        <div className={styles.form}>
          <form action="">
            <FormInput
              type="text"
              id="truckNumber"
              label="truck number"
              placeholder="Iveco 12A34"
              required={true}
              value={newShipment.truckNumber}
              onChange={(e) =>
                setNewShipment({ ...newShipment, truckNumber: e.target.value })
              }
            />

            <FormInput
              type="text"
              id="origin"
              label="origin"
              placeholder="lagos"
              required={true}
              value={newShipment.origin}
              onChange={(e) =>
                setNewShipment({ ...newShipment, origin: e.target.value })
              }
            />

            <FormInput
              type="text"
              id="destination"
              label="destination"
              placeholder="enugu"
              required={true}
              value={newShipment.destination}
              onChange={(e) =>
                setNewShipment({ ...newShipment, destination: e.target.value })
              }
            />

            <FormInput
              type="number"
              id="weight"
              label="weight"
              placeholder="1000"
              required={true}
              value={newShipment.weight === "" ? "" : newShipment.weight}
              onChange={(e) =>
                setNewShipment({
                  ...newShipment,
                  weight: e.target.value,
                })
              }
            />
          </form>
        </div>
        <div className={styles.footer}>
          <Button backgroundColor="var(--danger)" fn={toggleModal}>
            cancel
          </Button>
          <Button backgroundColor="var(--primary)" fn={handleShipmentCreation}>
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
