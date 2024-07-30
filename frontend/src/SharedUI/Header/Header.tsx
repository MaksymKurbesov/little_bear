import styles from "./Header.module.css";
import Settings from "../../icons/Settings";
import { dailyReward } from "../../images";
import { calculateTimeLeft } from "../../utils/helpers.ts";
import LittleBearIcon from "../../images/little-bear-icon.png";
import { NavLink, useLocation } from "react-router-dom";
import ProgressBar from "../../Pages/Main/components/ProgressBar/ProgressBar.tsx";
import { useAppState } from "../../Stores/AppStateContext.tsx";
import { useEffect, useState } from "react";

const Header = () => {
  const { state } = useAppState();
  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const location = useLocation();
  const isPlayPage = location.pathname === "/";

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

  if (!state.user) return;

  return (
    <div
      className={`${styles["header"]} ${isPlayPage ? styles["header-main"] : ""}`}
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
            <NavLink to={"levels"}>
              <ProgressBar points={state.points} />
            </NavLink>
          </div>
        </div>
      </div>

      <div className={styles["daily-reward"]}>
        <NavLink to={"/daily-reward"} className={styles["daily-reward-link"]}>
          <div className={styles["dot"]}></div>
          <img
            src={dailyReward}
            alt="Daily Reward"
            className={styles["daily-icon"]}
          />
          <div className={styles["daily-text"]}>
            <p>Daily reward</p>
            <p>{dailyRewardTimeLeft}</p>
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
