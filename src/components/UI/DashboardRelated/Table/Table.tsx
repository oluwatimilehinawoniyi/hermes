import React from "react";
import style from "./table.module.css";

interface TableProps {
  headers: string[];
  data: Record<string, string | number>[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className={style.table}>
      <thead>
        <tr className={style.HeadTr}>
          {headers.map((header, index) => (
            <td key={index}>{header}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, cellIndex) => (
              <td key={cellIndex}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;