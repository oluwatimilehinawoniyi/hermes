import shipmentVideo from "@assets/images/shipment.mp4";
import Section from "@components/UI/Section/Section";
import styles from "./whatWeDo.module.css";

export default function WhatWeDo() {
  const stats = [
    {
      value: "520k",
      description: "Packages Delivered",
    },
    {
      value: "99%",
      description: "On-time Delivery Rate",
    },
    {
      value: "500+",
      description: "Global Partners",
    },
    {
      value: "24/7",
      description: "Customer Support",
    },
  ];
  return (
    <Section>
      <div className={styles.doings}>
        <div className={styles.doingsTextContent}>
          <div className={styles.doingsText}>
            <h1>
              <span>seamless logistics</span> <br /> for a connected world
            </h1>
            <p>
              Discover a world of seamless logistics solutions designed to meet
              the demands of a connected world. At Hermes, we provide innovative
              tools and reliable services to ensure your shipments are tracked,
              secure, and delivered on time, every time. Join us in creating a
              magical and efficient logistics experience.
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
            {stats.map(({ value, description }, index) => (
              <span key={index} className={styles.stats}>
                <h1>{value}</h1>
                <p>{description}</p>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
