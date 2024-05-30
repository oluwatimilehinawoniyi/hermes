import Section from "@components/UI/Section/Section";
import { ArrowUpDown } from "lucide-react";
import styles from "./features.module.css";

export default function Features() {
  const features = [
    {
      title: "Innovative Environment",
      description:
        "Join a forward-thinking team where your ideas are valued and innovation thrives.",
      icon: <ArrowUpDown />,
    },
    {
      title: "Career Growth",
      description:
        "Get numerous opportunities for professional development and career advancement.",
      icon: <ArrowUpDown />,
    },
    {
      title: "Collaborative Culture",
      description:
        "This is an environment where teamwork is at the heart of our operations.",
      icon: <ArrowUpDown />,
    },
    {
      title: "Employee Well-being",
      description:
        "Enjoy comprehensive health benefits, wellness programs, and a healthy work-life balance.",
      icon: <ArrowUpDown />,
    },
  ];
  return (
    <Section>
      <div className={styles.features}>
        <div className={styles.featureHeader}>
          <h1>
            <span>growth</span> while <br /> creating magic
          </h1>
          <p>
            We give you the necessary tools and benchmark to grow beyond your
            expectations. While doing this, you can look back and see your
            magical trails at Hermes!
          </p>
        </div>
        <div className={styles.featuresList}>
          {features.map(({ description, icon, title }, index) => (
            <div key={index}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
