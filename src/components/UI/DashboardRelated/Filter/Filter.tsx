import { ArrowDownAZ, ChevronUp } from "lucide-react";
import style from "./filter.module.css";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const parentVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1, 
      when: "afterChildren",
    },
  },
};

const childVariants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20, 
      stiffness: 100,
    },
  },
  exit: {
    y: 20, // move up a bit on exit
    opacity: 0,
  },
};

export default function Filter({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  return (
    <div className={style.filter} ref={dropdownRef}>
      <div className={style.ctrl}>
        <p>sort by :</p>

        <div className={style.activeTag} onClick={() => setIsOpen(!isOpen)}>
          <p>
            {options.find((option) => option.value === selectedOption)?.label}
          </p>
          <ChevronUp
            size={18}
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </div>
      <div className={style.sort}>
        <ArrowDownAZ size={18} />
        {/* <ArrowDownZA size={18} /> */}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={style.selectOptions}
          >
            {options.map((option) => (
              <motion.div
                variants={childVariants}
                key={option.value}
                className={style.selectOption}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
