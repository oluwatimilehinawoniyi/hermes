import Logo from "@components/UI/Logo/Logo";
import Button from "@components/UI/Button/Button";
import Profile from "@components/UI/Profile/Profile";
import {
  ListItem,
  ListItemHolder,
} from "@components/UI/DashboardRelated/ListComponents/ListItem";
import style from "./sidebar.module.css";
import {
  Bell,
  Box,
  Flag,
  LayoutGrid,
  MessageSquareWarning,
  Truck,
  User,
} from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { item: "dashboard", icon: LayoutGrid, hasStat: false },
    { item: "shipment", icon: Truck, hasStat: false },
    { item: "parcels", icon: Box, stat: 10, hasStat: true },
    { item: "branches", icon: Flag, hasStat: false },
    { item: "clients", icon: User, hasStat: false },
  ];

  return (
    <nav className={style.nav}>
      <div className={style.topSection}>
        <div
          style={{
            paddingInline: "1rem",
            marginBottom: ".5rem",
            width: "80%",
            overflow: "hidden",
          }}
        >
          <Logo isLink={false} width="100%" />
        </div>
        <ListItemHolder styles={{ paddingRight: "0.5rem" }}>
          <ListItem
            isLink={false}
            title="requests"
            icon={MessageSquareWarning}
            hasStats={true}
            stats={10}
          />
          <ListItem
            isLink={false}
            title="notifications"
            icon={Bell}
            hasStats={true}
            stats={10}
          />
        </ListItemHolder>
      </div>
      <div className={style.middleSection}>
        <ListItemHolder styles={{ paddingRight: "0.5rem" }}>
          {navItems.map((nav) => (
            <ListItem
              isLink={true}
              title={nav.item}
              icon={nav.icon}
              key={nav.item}
              hasStats={nav.hasStat}
              stats={nav.stat}
            />
          ))}
        </ListItemHolder>
        <div className={style.sidebarBtn}>
          <Button width="100%">create shipment</Button>
        </div>
      </div>
      <div className={style.bottomSection}>
        <Profile manager="Jane Doe" />
      </div>
    </nav>
  );
}