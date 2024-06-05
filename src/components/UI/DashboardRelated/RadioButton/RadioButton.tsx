import { ChangeEvent } from "react";
import styles from "./radio.module.css";

interface StatusRadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const StatusRadioButton: React.FC<StatusRadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
}) => (
  <label className={styles.label}>
    <input
      type="radio"
      className={styles.radioInput}
      checked={checked}
      onChange={onChange}
      name="status"
      value={value}
      required
    />
    {label}
  </label>
);

interface RadioStatusSelectorProps {
  status: string;
  setStatus: (status: string) => void;
}

export const RadioStatusSelector: React.FC<RadioStatusSelectorProps> = ({
  status,
  setStatus,
}) => {
  return (
    <div className={styles.radioButtonGroup}>
      <p>Status:</p>
      <div className={styles.radios}>
        {["available", "active", "maintenance"].map((option) => (
          <StatusRadioButton
            key={option}
            label={option.charAt(0).toUpperCase() + option.slice(1)}
            value={option}
            checked={status === option}
            onChange={(e) => setStatus(e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};
