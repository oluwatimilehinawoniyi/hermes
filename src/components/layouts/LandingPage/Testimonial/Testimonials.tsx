import Section from "@components/UI/Section/Section";
import { testimonies } from "@data/testimonial";
import styles from "./testimonials.module.css";
import useTestimonialIncrementor from "@hooks/useTestimonialIncrementor";

import { motion } from "framer-motion";

export default function Testimonials() {
  const { activeIndex, setActiveIndex } = useTestimonialIncrementor(
    testimonies.length
  );

  function handleTestifierClick(index: number) {
    setActiveIndex(index);
  }

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Section>
      <div className={styles.testimonial}>
        <h1 className={styles.testimonialHeader}>
          your fellow <br /> <span>associates</span> said:
        </h1>
        <div>
          <motion.div
            className={styles.testimonyContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.testifiersContainer}>
              {testimonies.map(({ name, id, alt, imgSrc, title }, index) => (
                <motion.div
                  className={`${styles.testifier} ${
                    activeIndex === index ? styles.activeTestifier : ""
                  }`}
                  variants={itemVariants}
                  onClick={() => handleTestifierClick(index)}
                  key={index}
                >
                  <span className={styles.testifiersImage}>
                    <img src={imgSrc} alt={alt} />
                  </span>
                  <span className={styles.testifiersName} key={id}>
                    <h2>{name}</h2>
                    <p>{title}</p>
                  </span>
                </motion.div>
              ))}
            </div>
            <div className={styles.testimonies}>
              <motion.div
                className={styles.testimony}
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>{testimonies[activeIndex].testimony}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
