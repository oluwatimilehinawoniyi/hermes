import { ReactNode } from "react";
import styles from "./modal.module.css";

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <section className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
