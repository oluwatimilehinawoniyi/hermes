import { LogOut } from "lucide-react";
import style from "./profile.module.css";
import { useAuth } from "@hooks/useAuth";

export default function Profile({ manager }: { manager: string }) {
  const { signOut } = useAuth();

  async function handleSignOut(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  }
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
      <div className={style.profileSettings} onClick={handleSignOut}>
        <LogOut size={18} />
      </div>
    </div>
  );
}
