import { ReactNode } from "react";
import styles from "./button.module.css";

export default function Button({
  children,
  disabled = false,
  message,
}: {
  children: ReactNode;
  disabled?: boolean;
  message?: string;
}) {
  return (
    <>
      <button className={styles.button} disabled={disabled}>
        {children}
      </button>
      {disabled && <p className={styles.message}>{message}</p>}
    </>
  );
}
