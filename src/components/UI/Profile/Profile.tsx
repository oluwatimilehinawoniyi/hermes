import { Ellipsis } from "lucide-react";
import style from "./profile.module.css";

export default function Profile({ manager }: { manager: string }) {
  return (
    <div className={style.profile}>
      <div>
        <div className={style.profileImage}>
          <img
            src="/src/assets/images/profile.jpg"
            alt={"picture of" + manager}
          />
        </div>
        <div className={style.profileName}>
          <h3>{manager}</h3>
          <p>manager</p>
        </div>
      </div>
      <div className={style.profileSettings}>
        <Ellipsis />
      </div>
    </div>
  );
}
