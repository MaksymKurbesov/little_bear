import { useEffect, useState } from "react";
import { calculateTimeLeft } from "../../../utils/helpers.ts";
import styles from "../Header.module.css";
import { NavLink } from "react-router-dom";
import { dailyReward } from "../../../images";
import { useAppState } from "../../../Stores/AppStateContext.tsx";

const DailyRewardHeader = () => {
  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const { state } = useAppState();

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
    <div className={styles["daily-reward"]}>
      <NavLink to={"/daily-reward"} className={styles["daily-reward-link"]}>
        {!state.user.hasClaimedToday && <div className={styles["dot"]}></div>}

        <img
          src={dailyReward}
          alt="Daily Reward"
          className={styles["daily-icon"]}
        />
        <div className={styles["daily-text"]}>
          <p>Daily reward</p>
          {state.user.hasClaimedToday ? (
            <p className={styles["claimed"]}>Claimed!</p>
          ) : (
            <p>{dailyRewardTimeLeft}</p>
          )}
        </div>
      </NavLink>
    </div>
  );
};

export default DailyRewardHeader;
