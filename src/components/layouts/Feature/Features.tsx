import Section from "@components/UI/Section/Section";
import { ArrowUpDown } from "lucide-react";
import styles from "./features.module.css";

export default function Features() {
  return (
    <Section>
      <div className={styles.features}>
        <div className={styles.featureHeader}>
          <h1>
            <span>Lorem</span> ipsum <br /> dolor sit.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            placeat ea, iure non reiciendis porro fugit temporibus, eius vel
            dolorem debitis odio!
          </p>
        </div>
        <div className={styles.featuresList}>
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index}>
              <span>
                <ArrowUpDown />
              </span>
              <h3>Lorem, ipsum.</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
