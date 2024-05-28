import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import style from "./showAll.module.css";

export default function ShowAll({ to }: { to: string }) {
  return (
    <Link to={to} className={style.showAll}>
      show all <ChevronRight size={14} />
    </Link>
  );
}
