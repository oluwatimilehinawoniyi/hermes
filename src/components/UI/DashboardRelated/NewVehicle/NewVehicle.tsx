import Button from "@components/UI/Button/Button";
import styles from "./newVehicle.module.css";
import useModal from "@hooks/useModal";
import supabase from "@utils/supabase";
import FormInput from "@components/UI/Form/FormInput";
import { useState } from "react";
import ButtonContent from "../SVGMorph/SVGMorph";
import { RadioStatusSelector } from "../RadioButton/RadioButton";

interface NewVehicle {
  truckModel: string;
  truckNumber: string;
  capacity: string;
  status: "active" | "maintenance" | "available";
}

export default function CreateVehicle() {
  const [radiostatus, setRadioStatus] = useState<string>("available");

  const [status, setStatus] = useState({
    loading: false,
    done: false,
    failed: false,
  });
  const [newVehicle, setNewVehicle] = useState<NewVehicle>({
    truckModel: "",
    truckNumber: "",
    capacity: "",
    status: "available",
  });

  const { toggleNVModal } = useModal();
  const handleVehicleCreation = async () => {
    console.log(newVehicle);

    setStatus({ loading: true, done: false, failed: false });
    const { error } = await supabase.from("trucks").insert({
      truck_model: newVehicle.truckModel,
      truck_number: newVehicle.truckNumber,
      capacity: newVehicle.capacity ? parseInt(newVehicle.capacity) : null,
      status: radiostatus,
    });

    if (error) {
      console.log(error);
      setStatus({ loading: false, done: false, failed: true });
    } else {
      setStatus({ loading: false, done: true, failed: false });
      setTimeout(toggleNVModal, 5000);
    }
  };

  return (
    <section className={styles.newVehicle}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p>create vehicle</p>
        </div>
        <div className={styles.form}>
          <form action="">
            <div className={styles.truckName}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <FormInput
                  type="text"
                  id="truckModel"
                  label="truck model"
                  placeholder="Iveco"
                  required={true}
                  value={newVehicle.truckModel}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, truckModel: e.target.value })
                  }
                />
              </div>

              <div
                style={{
                  width: "100%",
                }}
              >
                <FormInput
                  type="text"
                  id="truckNumber"
                  label="truck number"
                  placeholder="12AB34"
                  required={true}
                  value={newVehicle.truckNumber}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      truckNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className={styles.truckRoute}>
              <div
                style={{
                  width: "100%",
                }}
              ></div>
              <div
                style={{
                  width: "100%",
                }}
              ></div>
            </div>
            <div className={styles.truckCapacity}>
              <div
                style={{
                  width: "calc(50% - .5rem)",
                }}
              >
                <FormInput
                  type="number"
                  id="capacity"
                  label="capacity"
                  placeholder="1000"
                  required={true}
                  value={newVehicle.capacity === "" ? "" : newVehicle.capacity}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      capacity: e.target.value,
                    })
                  }
                />
              </div>
              <div
                style={{
                  width: "70%",
                }}
              >
                <RadioStatusSelector
                  status={radiostatus}
                  setStatus={setRadioStatus}
                />
              </div>
            </div>
          </form>
        </div>
        <div className={styles.footer}>
          <Button backgroundColor="var(--danger)" fn={toggleNVModal}>
            cancel
          </Button>
          <Button backgroundColor="var(--primary)" fn={handleVehicleCreation}>
            {status.loading ? (
              <ButtonContent status={{ loading: true, text: "vehicle" }} />
            ) : status.done ? (
              <ButtonContent status={{ done: true, text: "vehicle" }} />
            ) : (
              <ButtonContent status={{ text: "vehicle" }} />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
