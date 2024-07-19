import styles from "./Header.module.css";
import Hamster from "../../icons/Hamster";
import Settings from "../../icons/Settings";
import { dollarCoin } from "../../images";

const Header = ({ userData }) => {
  const { username, profitPerHour, status } = userData;

  return (
    <div className={styles["header"]}>
      <div className={styles["left-column"]}>
        <div className={styles["nickname"]}>
          <Hamster size={24} className={styles["user-icon"]} />
          <p>{username}</p>
        </div>
        <div className={styles["level"]}>
          <p>
            {status} <span>0/7</span>
          </p>
          <div className={styles["progress"]}></div>
        </div>
      </div>

      <div className={styles["additional-button"]}>
        <div className={styles["profit-wrapper"]}>
          <p className={styles["profit-text"]}>Profit per hour</p>
          <p className={styles["profit-value"]}>
            <img
              src={dollarCoin}
              alt="Dollar Coin"
              className="w-[18px] h-[18px]"
            />
            +{profitPerHour}
          </p>
        </div>

        <div className={styles["settings"]}>
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Header;
