import styles from "./Header.module.css";
import Settings from "../../icons/Settings";
import { dailyReward } from "../../images";
import { calculateTimeLeft } from "../../utils/helpers.ts";
import LittleBearIcon from "../../images/little-bear-icon.png";
import { NavLink, useLocation } from "react-router-dom";
import ProgressBar from "../../Pages/Main/components/ProgressBar/ProgressBar.tsx";
import { useAppState } from "../../Stores/AppStateContext.tsx";
import { useEffect, useState } from "react";

const Header = ({ user }) => {
  const location = useLocation();
  const isPlayPage = location.pathname === "/";
  const isAirdropPage = location.pathname === "/airdrop";

  const isTransparentMenu = isPlayPage || isAirdropPage;

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft());
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!user) {
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
            <p>{user.username}</p>
            <NavLink to={"/skins"}>
              <ProgressBar points={user.points} />
            </NavLink>
          </div>
        </div>
      </div>

      <div className={styles["daily-reward"]}>
        <NavLink to={"/daily-reward"} className={styles["daily-reward-link"]}>
          {!user.hasClaimedToday && <div className={styles["dot"]}></div>}

          <img
            src={dailyReward}
            alt="Daily Reward"
            className={styles["daily-icon"]}
          />
          <div className={styles["daily-text"]}>
            <p>Daily reward</p>
            {user.hasClaimedToday ? (
              <p className={styles["claimed"]}>Claimed!</p>
            ) : (
              <p>{dailyRewardTimeLeft}</p>
            )}
          </div>
        </NavLink>
      </div>

      <NavLink to={"/settings"}>
        <div className={styles["settings"]}>
          <Settings />
        </div>
      </NavLink>
    </div>
  );
};

export default Header;
