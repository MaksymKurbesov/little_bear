import styles from "./Header.module.css";
import Settings from "../../icons/Settings";
import LittleBearIcon from "../../images/little-bear-icon.png";
import { NavLink, useLocation } from "react-router-dom";
import ProgressBar from "../../Pages/Main/ProgressBar/ProgressBar.tsx";
import DailyRewardHeader from "./DailyRewardHeader/DailyRewardHeader.tsx";
import { useAppState } from "../../Stores/AppStateContext.tsx";

const Header = () => {
  const location = useLocation();
  const isPlayPage = location.pathname === "/";
  const isAirdropPage = location.pathname === "/airdrop";
  const { state } = useAppState();

  const isTransparentMenu = isPlayPage || isAirdropPage;

  if (!state.user) {
    return null;
  }

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
