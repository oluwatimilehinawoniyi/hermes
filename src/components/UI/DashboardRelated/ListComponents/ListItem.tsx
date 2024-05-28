import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import style from "./listComponents.module.css";

interface ListItemProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  styles?: React.CSSProperties;
  isLink: boolean;
  hasStats?: boolean;
  stats?: number;
}

interface ListItemHolderProps {
  children: ReactNode;
  styles?: React.CSSProperties;
}

export function ListItemHolder({
  children,
  styles: customStyle,
}: ListItemHolderProps): React.JSX.Element {
  return (
    <ul className={style.listItemHolder} style={customStyle}>
      {children}
    </ul>
  );
}

export function ListItem({
  title,
  icon: Icon,
  styles: customStyle,
  isLink = true,
  hasStats = false,
  stats,
}: ListItemProps): React.JSX.Element {
  function generateRoute(title: string): string {
    return title === "dashboard" ? "/dashboard" : `/dashboard/${title}`;
  }

  const isDashboardHome = title === "dashboard";

  if (isLink) {
    return (
      <li className={style.listItem} style={customStyle}>
        <NavLink
          to={generateRoute(title)}
          end={isDashboardHome}
          className={({ isActive }) =>
            isActive
              ? `${style.navLinkItem} ${style.sideLinks} ${style.activeNavLink}`
              : `${style.navLinkItem} ${style.sideLinks}`
          }
        >
          <div className={style.navItem}>
            <Icon width={18} />
            <p>{title}</p>
          </div>
          {hasStats && stats !== undefined && (
            <span className={style.stats}>
              <p>{stats}</p>
            </span>
          )}
        </NavLink>
      </li>
    );
  } else {
    return (
      <li className={style.listItem} style={customStyle}>
        <div className={style.notifListItem}>
          <div className={style.itemConstant}>
            <Icon width={18} />
            <p>{title}</p>
          </div>
          {hasStats && stats !== undefined && (
            <span className={style.stats}>
              <p>{stats}</p>
            </span>
          )}
        </div>
      </li>
    );
  }
}
