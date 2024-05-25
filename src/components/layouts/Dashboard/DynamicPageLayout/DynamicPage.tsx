/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";
import { ReactNode, useState } from "react";
import style from "./dynamic.module.css";
import Filter from "@components/UI/DashboardRelated/Filter/Filter";

export default function DynamicPage({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const filterBtns = [
    { item: "arrival", length: 20 },
    { item: "available", length: 5 },
    { item: "departure", length: 35 },
  ];
  return (
    <section className={style.dynamicPage}>
      <div className={style.header}>
        <SearchBar />
        <DynamicHeader title={title} dataFilters={filterBtns}>
          <Filter title="sort by" />
          <Filter title="arrival date" />
        </DynamicHeader>
      </div>
      <section className={style.body}>{children}</section>
    </section>
  );
}

interface DynamicHeaderProps {
  children: ReactNode;
  title: string;
  dataFilters?: { item: string; length: number; fn?: () => void }[];
}

export function DynamicHeader({
  children,
  title,
  dataFilters,
}: DynamicHeaderProps) {
  const [activeFilter, setActiveFilter] = useState(0);

  function handleBtnClickEvent(index: number) {
    setActiveFilter(index);
    dataFilters?.[index].fn?.();
  }

  return (
    <header className={style.dynamicHeader}>
      <div>
        <h1>{title}</h1>
        <FilterButtonsBox>
          {dataFilters?.map(({ item, length }, index) => (
            <FilterButton
              key={index}
              index={index}
              item={item}
              length={length}
              activeFilter={activeFilter}
              handleClickEvent={handleBtnClickEvent}
            />
          ))}
        </FilterButtonsBox>
      </div>
      <div className={style.sortBox}>{children}</div>
    </header>
  );
}

function FilterButtonsBox({ children }: { children: ReactNode }) {
  return <div className={style.filterBtns}>{children}</div>;
}

interface DynamicHeaderFilterProps {
  index: number;
  activeFilter: number;
  item: string;
  length: number;
  handleClickEvent?: (index: number) => void;
}

function FilterButton({
  activeFilter,
  index,
  item,
  length,
  handleClickEvent,
}: DynamicHeaderFilterProps) {
  return (
    <button
      className={activeFilter === index ? style.activeBtn : style.inActiveBtn}
      onClick={() => handleClickEvent && handleClickEvent(index)}
    >{`${item} (${length})`}</button>
  );
}

// interface DynamicTableProps {
//   header: string[];
//   body: (string | number)[][];
// }

// export function DynamicTable({ header, body }: DynamicTableProps) {
//   return (
//     <section className={style.dynamicTable}>
//       <div className={style.gridTable}>
//         <div className={style.gridHeader}>
//           {header.map((item, index) => (
//             <div
//               key={index}
//               className={`${style.gridHeaderItem} ${style.gridCell} `}
//             >
//               <p>{item}</p>
//             </div>
//           ))}
//         </div>
//         <div className={style.gridBody}>
//           {body.map((row, rowIndex) => (
//             <div key={rowIndex} className={style.gridRow}>
//               {row.map((cell, cellIndex) => (
//                 <div
//                   key={cellIndex}
//                   className={`${style.gridCell} ${
//                     cellIndex === row.length - 1 ? style.lastCell : ""
//                   }`}
//                 >
//                   <p>{cell}</p>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

interface DynamicTableProps<T> {
  header: string[];
  body: T[];
  gridColumns: string;
}
export function DynamicTable<T>({
  header,
  body,
  gridColumns,
}: DynamicTableProps<T>) {
  return (
    <section className={style.dynamicTable}>
      <div className={style.gridTable}>
        <div
          className={style.gridHeader}
          style={{
            gridTemplateColumns: gridColumns,
          }}
        >
          {header.map((item, index) => (
            <div
              key={index}
              className={`${style.gridHeaderItem} ${style.gridCell}`}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
        <div className={style.gridBody}>
          {body.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={style.gridRow}
              style={{
                gridTemplateColumns: gridColumns,
              }}
            >
              {header.map((key, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`${style.gridCell} ${
                    cellIndex === header.length - 1 ? style.lastCell : ""
                  }`}
                >
                  <p
                    className={`${
                      key === "status" &&
                      ((row as any)[key] === "delayed" ||
                        (row as any)[key] === "inactive")
                        ? style.delayedStatus
                        : key === "status" &&
                          ((row as any)[key] === "on way" ||
                            (row as any)[key] === "pending")
                        ? style.onWayStatus
                        : key === "status" &&
                          ((row as any)[key] === "arrived" ||
                            (row as any)[key] === "delivered" ||
                            (row as any)[key] === "accepted" ||
                            (row as any)[key] === "active")
                        ? style.arrivedStatus
                        : ""
                    }`}
                  >
                    {(row as any)[key]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
