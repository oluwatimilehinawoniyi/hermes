/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useRef, useState } from "react";
import style from "./dynamic.module.css";
import supabase from "@utils/supabase";

export default function DynamicPage({
  tableComponent,
  headerFilters,
  searchBarComponent,
}: {
  searchBarComponent: ReactNode;
  tableComponent: ReactNode;
  headerFilters: ReactNode;
}) {
  return (
    <section className={style.dynamicPage}>
      <div className={style.header}>
        {searchBarComponent}
        {headerFilters}
      </div>
      <section className={style.body}>{tableComponent}</section>
    </section>
  );
}

interface DynamicHeaderProps {
  filterChildren?: ReactNode;
  sortChildren?: ReactNode;
  title: string;
}

export function DynamicHeader({
  sortChildren,
  filterChildren,
  title,
}: DynamicHeaderProps) {
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

interface HasIdAndStatus {
  id: string;
  status: string;
}

interface DynamicTableProps<T extends HasIdAndStatus> {
  header: string[];
  body: T[];
  gridColumns: string;
  statuses?: string[];
}
export function DynamicTable<T extends HasIdAndStatus>({
  header,
  body,
  gridColumns,
  statuses,
}: DynamicTableProps<T>) {
  const [localBody, setLocalBody] = useState<T[]>(body);
  const [openRowId, setOpenRowId] = useState<null | string | number>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenRowId(null);
    }
  };

  const handleSelect = async (rowId: string, value: string) => {
    // console.log(rowId, value);

    const { error } = await supabase
      .from("requests")
      .update({ status: value })
      .eq("id", rowId);

    if (error) {
      console.error("Failed to update status in the backend:", error);
      return;
    }

    setLocalBody(
      localBody.map((row) => {
        if (row.id === rowId) {
          return { ...row, status: value };
        }
        return row;
      })
    );

    setOpenRowId(null);
  };

  useEffect(() => {
    setLocalBody(body);
  }, [body]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "delayed":
      case "denied":
      case "pending":
      case "inactive":
        return style.delayedStatus;
      case "on way":
      case "in transit":
        return style.onWayStatus;
      case "arrived":
      case "available":
      case "delivered":
      case "approved":
      case "active":
        return style.arrivedStatus;
      default:
        return "";
    }
  };
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
          {localBody.map((row, rowIndex) => (
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
                  {key === "status" ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenRowId(openRowId === row.id ? null : row.id);
                      }}
                      className={`${style.statusComp} ${getStatusStyle(
                        row.status
                      )}`}
                    >
                      <p>{(row as any)[key]}</p>
                      {openRowId === row.id && (
                        <div className={style.selectStatuses} ref={dropdownRef}>
                          {statuses?.map((status) => (
                            <div
                              key={status}
                              className={style.selectStatus}
                              onClick={() => handleSelect(row.id, status)}
                            >
                              {status}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>{(row as any)[key]}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
