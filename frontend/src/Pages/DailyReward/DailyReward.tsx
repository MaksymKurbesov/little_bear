import styles from "./DailyReward.module.css";
import { dollarCoin } from "../../images";
import { DAILY_REWARDS } from "../../utils/consts.ts";

import { userService } from "../../main.tsx";
import { ScrollRestoration } from "react-router-dom";
import { useEffect } from "react";
import { useAppState } from "../../Stores/AppStateContext.tsx";

const DailyReward = () => {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    if (state.user) {
      userService.checkDailyReward(state.user.id, dispatch);
    }
  }, []);

  return (
    <>
      <div className={styles["daily-reward"]}>
        <h1 className={"page-title"}>Daily reward</h1>
        <p className={styles["subtitle"]}>
          Accrue coints for logging into the game daily without skipping
        </p>
        <ul className={styles["daily-list"]}>
          {DAILY_REWARDS.map((reward, index) => {
            if (!state.user) return;

            const isActive = index < state.user.consecutiveDays;

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
            userService.claimDailyReward(state.user, dispatch);
          }}
          className={`${styles["claim-button"]} ${state.user?.hasClaimedToday ? styles["claim-button-disabled"] : ""}`}
        >
          {state.user?.hasClaimedToday ? "Come back tomorrow" : "Claim"}
        </button>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default DailyReward;
