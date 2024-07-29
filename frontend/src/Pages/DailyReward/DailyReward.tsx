import styles from "./DailyReward.module.css";
import DailyRewardIcon from "../../images/daily-reward-page.png";
import { dollarCoin } from "../../images";
import { DAILY_REWARDS } from "../../utils/consts.ts";

import { userService } from "../../main.tsx";
import { useOutletContext } from "react-router-dom";

const DailyReward = () => {
  const { userData, setUserData } = useOutletContext();

  return (
    <div className={styles["daily-reward"]}>
      <img className={styles["daily-icon"]} src={DailyRewardIcon} alt={""} />
      <h1>Daily reward</h1>
      <p className={styles["subtitle"]}>
        Accrue coints for logging into the game daily without skipping
      </p>
      <ul className={styles["daily-list"]}>
        {DAILY_REWARDS.map((reward, index) => {
          const isActive = index < userData?.consecutiveDays;

          return (
            <li
              key={index}
              className={` ${isActive ? styles["daily-item-active"] : styles["daily-item"]}`}
            >
              Day {index + 1}
              <img
                src={dollarCoin}
                alt="Dollar Coin"
                className="w-[18px] h-[18px]"
              />
              {reward}
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          userService.claimDailyReward(userData, setUserData);
        }}
        className={`${styles["claim-button"]} ${userData?.hasClaimedToday ? styles["claim-button-disabled"] : ""}`}
      >
        {userData?.hasClaimedToday ? "Come back tomorrow" : "Claim"}
      </button>
    </div>
  );
};

export default DailyReward;
