import styles from "./SystemLevels.module.css";
import Slider from "./components/Slider/Slider.tsx";
import { useState } from "react";

const BACKGROUND = ["gaming-bg", "stony-bg", "acid-bg"];

const SystemLevels = () => {
  const [currentSkin, setCurrentSkin] = useState(0);

  return (
    <div
      className={`${styles["system-levels"]} ${styles[BACKGROUND[currentSkin]]}`}
    >
      <div className={styles["title-wrapper"]}>
        <h1 className={"page-title"}>Skin Gallery</h1>
        <p className={styles["subtitle"]}>Unlock Your Style</p>
      </div>

      <div className={styles["slider-wrapper"]}>
        <Slider setCurrentSkin={setCurrentSkin} />
      </div>
      {/*<div*/}
      {/*  className={`${styles["orb"]} ${currentSkin === 1 || currentSkin === 3 ? styles["red-orb"] : ""}`}*/}
      {/*></div>*/}
    </div>
  );
};

export default SystemLevels;
//
// title height = 78
//
//
// 29 + 12 = 41
