import styles from "./LoadingScreen.module.css";
import LoadingScreenImage from "../../images/loading screen.png";
import MainBG from "/bg-light.webp";
import { useImagePreloader } from "../../hooks/useImagePreloader.ts";
import { useEffect, useRef, useState } from "react";
import { simulateLoadingProgress } from "../../utils/helpers.ts";

const LoadingScreen = ({ setIsLoadingScreen }) => {
  const imagesLoaded = useImagePreloader([LoadingScreenImage, MainBG]);
  const [progress, setProgress] = useState(0);
  const wrapperRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoadingScreen(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (mounted.current && imagesLoaded) {
      simulateLoadingProgress(setProgress);
    }
  }, [imagesLoaded]);

  return (
    <div ref={wrapperRef} className={styles["loading-screen"]}>
      <img src={LoadingScreenImage} alt={""} />
      <div className={styles["progress-bar"]}>
        <p className={styles["text"]}>Loading</p>
        <p className={styles["percent"]}>{progress}%</p>
        <span style={{ width: `${progress}%` }}></span>
      </div>
    </div>
  );
};

export default LoadingScreen;
