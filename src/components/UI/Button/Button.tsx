import { ReactNode } from "react";
import styles from "./button.module.css";

export default function Button({
  children,
  disabled = false,
  message,
  width,
  color = "#fff",
  backgroundColor = "var(--primary)",
  fn,
  type,
}: {
  children: ReactNode;
  disabled?: boolean;
  message?: string;
  backgroundColor?: string;
  width?: string;
  color?: string;
  fn?: (e: React.FormEvent) => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <>
      <button
        className={styles.button}
        disabled={disabled}
        onClick={fn}
        type={type}
        style={{
          width: width,
          backgroundColor: backgroundColor,
          color: backgroundColor === "white" ? "var(--primary)" : color,
          fontWeight: "var(--font-medium)",
        }}
      >
        {children}
      </button>
      {disabled && <p className={styles.message}>{message}</p>}
    </>
  );
}
