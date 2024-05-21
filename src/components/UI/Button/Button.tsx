import { ReactNode } from "react";
import styles from "./button.module.css";

export default function Button({
  children,
  disabled = false,
  message,
  width,
  backgroundColor = "var(--primary)",
}: {
  children: ReactNode;
  disabled?: boolean;
  message?: string;
  backgroundColor?: string;
  width?: string;
}) {
  return (
    <>
      <button
        className={styles.button}
        disabled={disabled}
        style={{
          width: width,
          backgroundColor: backgroundColor,
          color: backgroundColor === "white" ? "var(--primary)" : "white",
          fontWeight: "var(--font-medium)",
        }}
      >
        {children}
      </button>
      {disabled && <p className={styles.message}>{message}</p>}
    </>
  );
}
