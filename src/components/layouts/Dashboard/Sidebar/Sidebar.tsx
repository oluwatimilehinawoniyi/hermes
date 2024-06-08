import Logo from "@components/UI/Logo/Logo";
import Button from "@components/UI/Button/Button";
import Profile from "@components/UI/Profile/Profile";
import {
  ListItem,
  ListItemHolder,
} from "@components/UI/DashboardRelated/ListComponents/ListItem";
import style from "./sidebar.module.css";
import {
  Box,
  ClipboardList,
  LayoutGrid,
  Plus,
  Truck,
  User,
} from "lucide-react";
import useModal from "@hooks/useModal";
import useTableFetcher from "@hooks/useTableFetcher";
import { getClients, getParcels, getRequests, getShipments } from "@api/index";

export default function Sidebar() {
  const { data: parcels } = useTableFetcher(getParcels);
  const { data: requests } = useTableFetcher(getRequests);
  const { data: clients } = useTableFetcher(getClients);
  const { data: shipments } = useTableFetcher(getShipments);

  const navItems = [
    { item: "dashboard", icon: LayoutGrid, hasStat: false },
    { item: "shipment", icon: Truck, hasStat: true, stat: shipments.length },
    { item: "parcels", icon: Box, stat: parcels.length, hasStat: true },
    {
      item: "requests",
      icon: ClipboardList,
      hasStat: true,
      stat: requests.length,
    },
    { item: "clients", icon: User, hasStat: true, stat: clients.length },
  ];

  const { toggleNVModal, toggleNSModal } = useModal();

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
          <Button width="100%" fn={toggleNSModal}>
            <Plus size={18} strokeWidth={3} style={{ stroke: "#fff" }} />
            create shipment
          </Button>
          <Button width="100%" fn={toggleNVModal}>
            <Truck size={18} strokeWidth={2} style={{ stroke: "#fff" }} />
            create vehicle
          </Button>
        </div>
      </div>
      <div className={style.bottomSection}>
        <Profile manager="Jane Doe" />
      </div>
    </nav>
  );
}
