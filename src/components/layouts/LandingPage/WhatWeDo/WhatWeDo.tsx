import shipmentVideo from "@assets/images/shipment.mp4";
import Section from "@components/UI/Section/Section";
import styles from "./whatWeDo.module.css";

export default function WhatWeDo() {
  return (
    <Section>
      <div className={styles.doings}>
        <div className={styles.doingsTextContent}>
          <div className={styles.doingsText}>
            <h1>
              <span>seamless logistics</span> <br /> for a connected world
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem repudiandae doloremque aliquam, obcaecati
              necessitatibus perferendis.
            </p>
          </div>
        </div>
        <div className={styles.videoHolder}>
          <video width="750" autoPlay loop muted>
            <source src={shipmentVideo} type="video/mp4" />
            Your browser does not support the video tag.
            {/* // video credit: Video by Jay S: https://www.pexels.com/video/a-railway-crossing-4021642/ */}
          </video>

          <div className={styles.statsHolder}>
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index} className={styles.stats}>
                <h1>20k</h1>
                <p>Lorem, ipsum.</p>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
