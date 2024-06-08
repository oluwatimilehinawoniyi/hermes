import { Search } from "lucide-react";
import style from "./searchbar.module.css";
import DateTime from "../DateTime/DateTime";

export default function SearchBar({ placeHolder }: { placeHolder: string }) {
  return (
    <div className={style.searchBar}>
      {/* Add interaction, when a search is not valid and when it is 
      <SearchCheck />
      <SearchX />
      */}
      <div className={style.searchInput}>
        <Search size={18} />
        <input type="text" placeholder={placeHolder} />
      </div>

      <div className={style.dateTime}>
        <DateTime />
      </div>
    </div>
  );
}
