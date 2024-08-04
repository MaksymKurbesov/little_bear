import styles from "./SystemLevels.module.css";
import Slider from "./components/Slider/Slider.tsx";
import { useState } from "react";
import { useImagePreloader } from "../../hooks/useImagePreloader.ts";
import LoadSpinning from "../../SharedUI/LoadSpinning/LoadSpinning.tsx";
import Bg1 from "/gaming-bg.png";
import Bg2 from "/stony-bg.png";
import Bg3 from "/acid-bg.png";

const BACKGROUND = ["gaming-bg", "stony-bg", "acid-bg"];

const SystemLevels = () => {
  const [currentSkin, setCurrentSkin] = useState(0);
  const imagesLoaded = useImagePreloader([Bg1, Bg2, Bg3]);

  if (!imagesLoaded) {
    return (
      <div className={"suspense"}>
        <LoadSpinning />
      </div>
    );
  }

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
    </div>
  );
};

export default SystemLevels;
