import styles from "./Friends.module.css";
import CopyIcon from "../../icons/copy.svg";
import InviteUserIcon from "../../icons/invite-user.svg";
import HighGiftIcon from "../../images/gift-icon-high.png";
import LowGiftIcon from "../../images/gift-icon-low.png";
import { useTelegram } from "../../hooks/useTelegram.ts";

const Friends = () => {
  const { tg, user } = useTelegram();

  const handleInviteClick = () => {
    const inviteUrl = `https://t.me/share/url?text=Invite%20your%20friends&url=t.me/little_bear_tap_bot/little_bear?startapp=little_bear_id=${user.id}`;

    tg.openTelegramLink(inviteUrl);
  };

  return (
    <div className={`${styles.friends} main`}>
      <h1>Invite friends!</h1>
      <p className={styles["subtitle"]}>
        You and your friend will receive bonuses
      </p>
      <ul className={styles["awards-list"]}>
        <li>
          <img src={LowGiftIcon} alt={""} width={50} />
          <div className={styles["gift-info"]}>
            <h3>Invite a friend</h3>
            <div className={styles["text-wrapper"]}>
              <p className={styles["description"]}>
                <span>+5,000 </span>
                <span>for you and your friend</span>
              </p>
            </div>
          </div>
        </li>
        <li>
          <img src={HighGiftIcon} alt={""} width={50} />
          <div className={styles["gift-info"]}>
            <h3>Invite a friend with Telegram Premium</h3>
            <div className={styles["text-wrapper"]}>
              <p className={styles["description"]}>
                <span>+25,000</span> <span>for you and your friend</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div className={styles["friends-list-wrapper"]}>
        <h2>List of your friends</h2>
        {/*<p className={styles["no-invited"]}>You haven't invited anynone yet</p>*/}
        <ul className={styles["friends-list"]}>
          <li className={styles["table-headers"]}>
            <span>№</span>
            <p>Nickname</p>
            <p>Level</p>
          </li>
          <li>
            <span>1.</span>
            <p>Username 1</p>
            <p>33</p>
          </li>
          <li>
            <span>2.</span>
            <p>Username 1</p>
            <p>15</p>
          </li>
          <li>
            <span>3.</span>
            <p>Username 1</p>
            <p>5</p>
          </li>
        </ul>
      </div>

      <div className={styles["invite-buttons"]}>
        <button
          className={styles["invite-friend-button"]}
          onClick={handleInviteClick}
        >
          Invite a friend <img src={InviteUserIcon} alt={""} width={15} />
        </button>
        <button className={styles["copy-button"]}>
          <img src={CopyIcon} alt={""} width={20} />
        </button>
      </div>
    </div>
  );
};

export default Friends;
