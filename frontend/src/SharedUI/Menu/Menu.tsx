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
          <Mine className="w-8 h-8 mx-auto" /> Mine
        </NavLink>
      </li>
      <li>
        <NavLink to={"/referrals"}>
          <Friends className="w-8 h-8 mx-auto" /> Referrals
        </NavLink>
      </li>
      <li>
        <NavLink to={"/news"}>
          <Coins className="w-8 h-8 mx-auto" /> News
        </NavLink>
      </li>
      <li>
        <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />
        <p>Exchange</p>
      </li>
    </ul>
  );
};

export default Menu;
