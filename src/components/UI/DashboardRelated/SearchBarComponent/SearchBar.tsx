import { Search } from "lucide-react";
import style from "./searchbar.module.css";
import DateTime from "../DateTime/DateTime";

export default function SearchBar() {
  return (
    <div className={style.searchBar}>
      {/* add interaction, when a search is not valid and when it is 
      <SearchCheck />
      <SearchX />
      */}
      <div className={style.searchInput}>
        <Search size={18} />
        <input type="text" placeholder="search by tracking number" />
      </div>

      <div className={style.dateTime}>
        <DateTime />
      </div>
    </div>
  );
}
