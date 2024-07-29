import styles from "./Leaders.module.css";
import BronzeMedal from "../../images/medals/bronze-avatar.png";
import SilverMedal from "../../images/medals/silver-avatar.png";
import GoldMedal from "../../images/medals/gold-avatar.png";
import IShowSpeed from "../../images/leaders/ishowspeed.jpg";
import Pewdiepie from "../../images/leaders/pewdiepie.jpg";
import Statham from "../../images/leaders/statham.jpg";

const Leaders = () => {
  return (
    <div className={`${styles.leaders} main`}>
      <h1 className={"page-title"}>Leaders</h1>
      <p className={styles["subtitle"]}>Top Performers: Leading the Game</p>
      <div className={styles["top3"]}>
        <div className={styles["silver"]}>
          <div className={styles["leader-avatar"]}>
            <img src={Pewdiepie} alt={""} width={85} />
            <img src={SilverMedal} alt={""} width={100} />
          </div>
          <p className={styles["leader-nickname"]}>pewdiepie</p>
          <span>402s</span>
        </div>
        <div className={styles["gold"]}>
          <div className={styles["leader-avatar"]}>
            <img src={IShowSpeed} alt={""} width={85} />
            <img src={GoldMedal} alt={""} width={100} />
          </div>
          <p className={styles["leader-nickname"]}>IShowSpeed</p>
          <span>499s</span>
        </div>
        <div className={styles["bronze"]}>
          <div className={styles["leader-avatar"]}>
            <img src={Statham} alt={""} width={85} />
            <img src={BronzeMedal} alt={""} width={100} />
          </div>
          <p className={styles["leader-nickname"]}>Statham</p>
          <span>399s</span>
        </div>
      </div>
      <ul className={styles["leaders-list"]}>
        <li className={styles["headers"]}>
          <span>№</span> <p>Nickname</p> <p>Dance time</p>
        </li>
        {/*<li>*/}
        {/*  <span>1</span> <p>BerryNew9057</p> <p>543s</p>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <span>2</span> <p>to_control_yourself</p> <p>412s</p>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <span>3</span> <p>stillish</p> <p>411s</p>*/}
        {/*</li>*/}
        <li>
          <span>4</span> <p>firmament42</p> <p>387s</p>
        </li>
        <li>
          <span>5</span> <p>TheTrollinator777</p> <p>341s</p>
        </li>
        <li>
          <span>6</span> <p>Dave-C</p> <p>301s</p>
        </li>
        <li>
          <span>7</span> <p>AlphaOwn</p> <p>259s</p>
        </li>
        <li>
          <span>8</span> <p>PostNutRagrets</p> <p>222s</p>
        </li>
        <li>
          <span>9</span> <p>Drostan_</p> <p>195s</p>
        </li>
        <li>
          <span>10</span> <p>Argon288</p> <p>100s</p>
        </li>
      </ul>
    </div>
  );
};

export default Leaders;
