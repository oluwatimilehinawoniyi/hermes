import shipment from "@assets/images/shipment.jpg";
import expand from "@assets/images/expand.jpg";
import people from "@assets/images/people.jpg";
import Button from "@components/UI/Button/Button";
import { ArrowUpRight } from "lucide-react";
import Section from "@components/UI/Section/Section";
import NavigationBar from "../Navigation/NavigationBar";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <Section>
      <div className={styles.hero}>
        <NavigationBar />
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>
              experience a
              <span className={styles.spanImg}>
                <img src={expand} alt="" className={styles.img} />
                {/* Photo by fauxels: https://www.pexels.com/photo/colleagues-shaking-each-other-s-hands-3184291/ */}
              </span>
              culture of <span className={styles.spanText}>inclusion</span>
              <span className={styles.spanImg}>
                <img src={people} alt="" className={styles.img} />
                {/*Photo by Rebrand Cities: https://www.pexels.com/photo/group-oo-people-having-a-meeting-1367276/ */}
              </span>
              and <span className={styles.spanText}>growth</span>
            </h1>

            <div className={styles.details}>
              <p>
                At Hermes, we believe that a vibrant, inclusive environment is
                key to driving our collective success. Experience a workplace
                where your growth is our priority, and your unique perspectives
                fuel our shared achievements.
              </p>
              <Button
                disabled={true}
                message="currently not accepting applications, but watchout!"
              >
                get started
                <ArrowUpRight color="white" size={18} />
              </Button>
            </div>
          </div>
          <div className={styles.heroImg}>
            <img
              style={{ objectPosition: "top" }}
              src={shipment}
              alt="image of a port with a ship on th ocean and containers on the port"
            />
            {/* image credit: Photo by Tom Fisk: https://www.pexels.com/photo/drone-shot-of-a-cargo-ship-on-port-3856433/ */}
          </div>
        </div>
      </div>
    </Section>
  );
}
