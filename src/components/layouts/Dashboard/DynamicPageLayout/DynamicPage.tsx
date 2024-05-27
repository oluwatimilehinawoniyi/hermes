/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@components/UI/DashboardRelated/SearchBarComponent/SearchBar";
import { ReactNode } from "react";
import style from "./dynamic.module.css";

export default function DynamicPage({
  tableComponent,
  headerFilters,
}: {
  tableComponent: ReactNode;
  headerFilters: ReactNode;
}) {
  return (
    <section className={style.dynamicPage}>
      <div className={style.header}>
        <SearchBar />
        {headerFilters}
      </div>
      <section className={style.body}>{tableComponent}</section>
    </section>
  );
}

interface DynamicHeaderProps {
  filterChildren: ReactNode;
  sortChildren: ReactNode;
  title: string;
}

export function DynamicHeader({
  sortChildren,
  filterChildren,
  title,
}:
DynamicHeaderProps) {
  return (
    <header className={style.dynamicHeader}>
      <div>
        <h1>{title}</h1>
        {filterChildren}
      </div>
      <div className={style.sortBox}>{sortChildren}</div>
    </header>
  );
}

export function FilterButtonsBox({ children }: { children: ReactNode }) {
  return <div className={style.filterBtns}>{children}</div>;
}

interface DynamicHeaderFilterProps {
  index: number;
  activeFilter: number;
  item: string;
  length: number;
  handleClickEvent?: (index: number) => void;
}

export function FilterButton({
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
