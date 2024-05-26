import { ArrowDownAZ, ChevronDown } from "lucide-react";
import style from "./filter.module.css";
import { useEffect, useRef, useState } from "react";

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
          <ChevronDown size={18} />
        </div>
      </div>
      <div className={style.sort}>
        <ArrowDownAZ size={18} />
        {/* <ArrowDownZA size={18} /> */}
      </div>

      {isOpen && (
        <div className={style.selectOptions}>
          {options.map((option) => (
            <div
              key={option.value}
              className={style.selectOption}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
