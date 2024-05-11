import { useEffect, useState } from "react";

export default function useTestimonialIncrementor(testimoniesLength: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  function IndexIncrementor() {
    if (activeIndex < testimoniesLength - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else {
      setActiveIndex(0);
    }
  }

  useEffect(() => {
    const interval = setInterval(IndexIncrementor, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return {
    activeIndex,
    setActiveIndex,
  };
}
