import React, { ReactNode } from "react";
import style from "./dashboardCard.module.css";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  customStyle?: React.CSSProperties;
}

export default function DashboardCard({
  children,
  className,
  customStyle,
}: DashboardCardProps): React.JSX.Element {
  const combinedClassName = `${style.card} ${className || ""}`;
  return (
    <div className={combinedClassName} style={customStyle}>
      {children}
    </div>
  );
}
