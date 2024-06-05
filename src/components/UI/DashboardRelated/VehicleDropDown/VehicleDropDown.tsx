import React, { useRef, useState, useEffect } from "react";
import supabase from "@utils/supabase";
import styles from "./vehicleDropDown.module.css";

interface Vehicle {
  id: string;
  truck_model: string;
  truck_number: string;
  capacity: number;
}

interface VehicleDropdownProps {
  onSelect: (vehicle: Vehicle) => void;
}

const VehicleDropdown: React.FC<VehicleDropdownProps> = ({ onSelect }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase
        .from("trucks")
        .select("*")
        .eq("status", "available");
      if (error) {
        console.error("Error fetching vehicles:", error);
      } else {
        setVehicles(data);
      }
    };

    fetchVehicles();
  }, []);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    onSelect(vehicle);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.dropdownButton}
      >
        {selectedVehicle
          ? `${selectedVehicle.truck_model} ${selectedVehicle.truck_number} - (${selectedVehicle.capacity}kg)`
          : "Select a vehicle"}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu} ref={dropdownRef}>
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={styles.dropdownItem}
              onClick={() => handleSelect(vehicle)}
            >
              <p>
                {vehicle.truck_model} {vehicle.truck_number} - (
                {vehicle.capacity}
                kg)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleDropdown;
