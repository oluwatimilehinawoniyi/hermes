import { AvailableTruckType } from "@components/layouts/Dashboard/AvailableTrucks/PageComponent/Available";

export function truckInfo({ truck }: { truck: AvailableTruckType }) {
  // Calculate load percentage
  const loadPercentage = Math.round(
    (truck.cargoesLoaded / truck["weight (kg)"]) * 100
  );

  // Determine color based on load percentage
  return loadPercentage < 50
    ? "var(--primary)"
    : loadPercentage <= 75
    ? "var(--warning)"
    : "var(--danger)";
}
