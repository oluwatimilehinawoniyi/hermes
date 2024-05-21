import { ChevronDown } from "lucide-react";
import style from "./filter.module.css";

export default function Filter({ title }: { title: string }) {
  return (
    <div className={style.filter}>
      <p>
        {title}: <span>barcelona</span>
      </p>
      <ChevronDown size={18} />
    </div>
  );
}
