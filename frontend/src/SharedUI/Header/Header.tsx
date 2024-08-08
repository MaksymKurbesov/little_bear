import styles from "./Header.module.css";
import Settings from "../../icons/Settings";
import LittleBearIcon from "../../images/little-bear-icon.png";
import { NavLink } from "react-router-dom";
import ProgressBar from "./ProgressBar/ProgressBar.tsx";
import DailyRewardHeader from "./DailyRewardHeader/DailyRewardHeader.tsx";
import { useAppState } from "../../Stores/AppStateContext.tsx";
import { useEffect } from "react";

const Header = ({ pathname }) => {
  const isPlayPage = pathname === "/";
  const isAirdropPage = pathname === "/airdrop";
  const { state } = useAppState();

  const isTransparentMenu = isPlayPage || isAirdropPage;

  if (!state.user) {
    return null;
  }

  useEffect(() => {
    console.log("header");
  }, []);

  return (
    <div
      className={`${styles["header"]} ${isTransparentMenu ? styles["transparent-header"] : ""}`}
    >
      <div className={styles["left-column"]}>
        <div className={styles["nickname"]}>
          <NavLink to={"/"}>
            <div className={styles["user-icon"]}>
              <img src={LittleBearIcon} alt={""} width={20} />
            </div>
          </NavLink>

          <div className={styles["info-wrapper"]}>
            <p>{state.user.username}</p>
            <NavLink to={"/skins"}>
              <ProgressBar points={state.points} />
            </NavLink>
          </div>
        </div>
      </div>

      <DailyRewardHeader />

      <NavLink to={"/settings"}>
        <div className={styles["settings"]}>
          <Settings />
        </div>
      </NavLink>
    </div>
  );
};

export default Header;
