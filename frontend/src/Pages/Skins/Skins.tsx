import styles from "./Skins.module.css";
import Slider from "./Slider/Slider.tsx";
import { useState } from "react";
import { useImagePreloader } from "../../hooks/useImagePreloader.ts";
import LoadSpinning from "../../SharedUI/LoadSpinning/LoadSpinning.tsx";
import Bg1 from "/wood-bg.png";
import Bg2 from "/bg2.png";
import Bg3 from "/bg3.png";
import Bg4 from "/bg4.png";
import Bg5 from "/bg5.png";

const BACKGROUND = [
  "bg-skin-1",
  "bg-skin-2",
  "bg-skin-3",
  "bg-skin-4",
  "bg-skin-5",
];

const Skins = () => {
  const [currentSkin, setCurrentSkin] = useState(0);
  const imagesLoaded = useImagePreloader([Bg1, Bg2, Bg3, Bg4, Bg5]);

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

export default Skins;
