import { Search } from "lucide-react";
import style from "./searchbar.module.css";
import DateTime from "../DateTime/DateTime";
import Filter from "../Filter/Filter";

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
      <div className={style.filters}>
        <Filter title="city" />
        <Filter title="department" />
      </div>

      <div>
        <DateTime />
      </div>
    </div>
  );
}
