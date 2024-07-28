import styles from "./Menu.module.css";
import Friends from "../../icons/Friends";
import Coins from "../../icons/Coins";
import { hamsterCoin } from "../../images";
import { NavLink } from "react-router-dom";
import LittleBearIcon from "../../images/little-bear-colored-icon.png";
import LittleBearGoldenIcon from "../../images/little-bear-golden.png";
import FriendsIcon from "../../images/friends-icon.png";
import NewsIcon from "../../images/news-icon.png";

import PlayIcon from "../../icons/play.webp";
import FrensIcon from "../../icons/frens.webp";
import LeadersIcon from "../../icons/leadership.webp";
import TasksIcon from "../../icons/tasks.webp";

const Menu = () => {
  return (
    <ul className={styles.menu}>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            isPending ? styles["pending"] : isActive ? styles["active"] : ""
          }
        >
          <img src={PlayIcon} width={22} alt={""} />
          <span>Bear</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/tasks"}
          className={({ isActive, isPending }) =>
            isPending ? styles["pending"] : isActive ? styles["active"] : ""
          }
        >
          <img
            src={TasksIcon}
            width={16}
            alt={""}
            className={`${styles["icon"]}`}
          />
          {/*<Friends className="w-5 h-5 mx-auto" /> */}
          <span>Tasks</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/referrals"}
          className={({ isActive, isPending }) =>
            isPending ? styles["pending"] : isActive ? styles["active"] : ""
          }
        >
          {/*<Coins className="w-5 h-5 mx-auto" /> */}
          <img
            src={FrensIcon}
            width={24}
            height={22}
            alt={""}
            className={`${styles["icon"]} ${styles["frens-icon"]}`}
          />
          <span>Frens</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/leaders"}
          className={({ isActive, isPending }) =>
            isPending ? styles["pending"] : isActive ? styles["active"] : ""
          }
        >
          {/*<Coins className="w-5 h-5 mx-auto" /> */}
          <img
            src={LeadersIcon}
            width={20}
            alt={""}
            className={`${styles["icon"]}`}
          />
          <span>Leaders</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/airdrop"}
          className={({ isActive, isPending }) =>
            isPending ? styles["pending"] : isActive ? styles["active"] : ""
          }
        >
          <img
            src={LittleBearGoldenIcon}
            alt="Airdrop"
            className={`${styles["icon"]} ${styles["airdrop-icon"]}`}
            width={24}
            height={24}
          />
          <span>Airdrop</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default Menu;
