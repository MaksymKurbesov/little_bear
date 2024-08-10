import styles from "./Skins.module.css";
import Slider from "./Slider/Slider.tsx";
import { useState } from "react";

const BACKGROUND = [
  "bg-skin-1",
  "bg-skin-2",
  "bg-skin-5",
  "bg-skin-4",
  "bg-skin-3",
];

const Skins = () => {
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
        <Slider setCurrentSkin={setCurrentSkin} currentSkin={currentSkin} />
      </div>
    </div>
  );
};

export default Skins;
