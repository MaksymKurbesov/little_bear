import styles from "./Leaders.module.css";
import BronzeMedal from "../../images/medals/bronze-avatar.webp";
import SilverMedal from "../../images/medals/silver-avatar.webp";
import GoldMedal from "../../images/medals/gold-avatar.webp";
import Leader1 from "../../images/leaders/1.png";
import Leader2 from "../../images/leaders/2.png";
import Leader3 from "../../images/leaders/3.png";
import Background from "/leaders-bg.webp";
import { ScrollRestoration } from "react-router-dom";
import { useImagePreloader } from "../../hooks/useImagePreloader.ts";
import LoadSpinning from "../../SharedUI/LoadSpinning/LoadSpinning.tsx";

const imageUrls = [
  BronzeMedal,
  SilverMedal,
  GoldMedal,
  Background,
  Leader1,
  Leader2,
  Leader3,
];

const MOCK_LEADERS = [
  { nickname: "DayEither8913", points: 1245774 },
  { nickname: "forever_pretty1", points: 956000 },
  { nickname: "morriartie", points: 674833 },
  { nickname: "firmament42", points: 554343 },
  { nickname: "TheTrollinator777", points: 312554 },
  { nickname: "Dave-C", points: 297543 },
  { nickname: "AlphaOwn", points: 157343 },
  { nickname: "PostNutRagrets", points: 80053 },
  { nickname: "Drostan_", points: 55551 },
  { nickname: "Argon288", points: 43544 },
];

const Leaders = () => {
  const imagesLoaded = useImagePreloader(imageUrls);

  if (!imagesLoaded) {
    return (
      <div className={"suspense"}>
        <LoadSpinning />
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.leaders} main`}>
        <h1 className={"page-title"}>Leaders</h1>
        <p className={styles["subtitle"]}>Top Performers: Leading the Game</p>
        <div className={styles["top3"]}>
          <div className={styles["silver"]}>
            <div className={styles["leader-avatar"]}>
              <img src={Leader1} alt={""} width={85} height={85} />
              <img src={SilverMedal} alt={""} width={90} />
            </div>
            <p className={styles["leader-nickname"]}>forever_pretty1</p>
            <span>956000</span>
          </div>
          <div className={styles["gold"]}>
            <div className={styles["leader-avatar"]}>
              <img src={Leader2} alt={""} width={85} height={85} />
              <img src={GoldMedal} alt={""} width={90} />
            </div>
            <p className={styles["leader-nickname"]}>DayEither8913</p>
            <span>1245774</span>
          </div>
          <div className={styles["bronze"]}>
            <div className={styles["leader-avatar"]}>
              <img src={Leader3} alt={""} width={85} height={85} />
              <img src={BronzeMedal} alt={""} width={90} />
            </div>
            <p className={styles["leader-nickname"]}>morriartie</p>
            <span>674833</span>
          </div>
        </div>
        <ul className={styles["leaders-list"]}>
          <li className={styles["headers"]}>
            <span>№</span> <p>Nickname</p> <p>Points</p>
          </li>
          {MOCK_LEADERS.slice(3).map((leader, index) => {
            return (
              <li key={index}>
                <span>{index + 4}</span> <p>{leader.nickname}</p>{" "}
                <p>{leader.points}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Leaders;
