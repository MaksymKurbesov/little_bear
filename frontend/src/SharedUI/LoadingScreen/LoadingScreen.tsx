import styles from "./LoadingScreen.module.css";
import LoadingScreenImage from "../../images/loading screen.png";
import { useImagePreloader } from "../../hooks/useImagePreloader.ts";

const LoadingScreen = ({ progress }) => {
  const imagesLoaded = useImagePreloader([LoadingScreenImage]);

  if (!imagesLoaded) {
    return null;
  }

  return (
    <div className={styles["loading-screen"]}>
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
