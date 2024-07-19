import styles from "./Menu.module.css";
import Mine from "../../icons/Mine";
import Friends from "../../icons/Friends";
import Coins from "../../icons/Coins";
import { hamsterCoin } from "../../images";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <ul className={styles.menu}>
      <li>
        <NavLink to={"/"}>
          <Mine className="w-5 h-5 mx-auto" /> Mine
        </NavLink>
      </li>
      <li>
        <NavLink to={"/referrals"}>
          <Friends className="w-5 h-5 mx-auto" /> Referrals
        </NavLink>
      </li>
      <li>
        <NavLink to={"/news"}>
          <Coins className="w-5 h-5 mx-auto" /> News
        </NavLink>
      </li>
      <li>
        <img
          src={hamsterCoin}
          alt="Airdrop"
          className={`${styles["hamster-icon"]} w-5 h-5 mx-auto`}
        />
        <p>Exchange</p>
      </li>
    </ul>
  );
};

export default Menu;
