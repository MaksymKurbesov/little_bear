import styles from "./Header.module.css";
import Settings from "../../icons/Settings";
import { dailyReward, dollarCoin } from "../../images";
import { getRank } from "../../utils/helpers.ts";
import LittleBearIcon from "../../images/little-bear-icon.png";
import GoldStatus from "../../icons/levels/gold.svg";
import { NavLink } from "react-router-dom";
import ProgressBar from "../../Pages/Main/components/ProgressBar/ProgressBar.tsx";

const Header = ({ userData, level, progressPercentage }) => {
  const { username, points } = userData;

  return (
    <div className={styles["header"]}>
      <div className={styles["left-column"]}>
        <div className={styles["nickname"]}>
          <div className={styles["user-icon"]}>
            <img src={LittleBearIcon} alt={""} width={20} />
          </div>

          <div className={styles["info-wrapper"]}>
            <p>{username}</p>
            <NavLink to={"levels"}>
              <ProgressBar
                points={points}
                level={level}
                progressPercentage={progressPercentage}
              />
            </NavLink>
          </div>
        </div>
      </div>

      <div className={styles["daily-reward"]}>
        <NavLink to={"/daily-reward"} className={styles["daily-reward-link"]}>
          {/*<div className={styles["daily-reward-wrapper"]}>*/}
          <div className={styles["dot"]}></div>
          <img
            src={dailyReward}
            alt="Daily Reward"
            className={styles["daily-icon"]}
          />
          <div className={styles["daily-text"]}>
            <p>Daily reward</p>
            <p>00:00</p>
          </div>
          {/*</div>*/}
        </NavLink>
      </div>

      <NavLink to={"/settings"}>
        <div className={styles["settings"]}>
          <Settings />
        </div>
      </NavLink>

      {/*</div>*/}
    </div>
  );
};

export default Header;
