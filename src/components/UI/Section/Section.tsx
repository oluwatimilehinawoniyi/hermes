import { ReactNode } from "react";
import styles from "./section.module.css";

export default function Section({
  children,
  backgroundColor = "white",
}: {
  children: ReactNode;
  backgroundColor?: string;
}) {
  return (
    <section
      className={styles.section}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div className={`componentPadding`}>{children}</div>
    </section>
  );
}
