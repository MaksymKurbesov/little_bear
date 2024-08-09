import styles from "./ProgressBar.module.css";
import ArrowIcon from "../../../icons/arrow.svg";
import {
  calculateProgressBar,
  getLevelByPoints,
} from "../../../utils/helpers.ts";
import { useAppState } from "../../../Stores/AppStateContext.tsx";

const ProgressBar = ({ points }) => {
  const level = getLevelByPoints(points);

  const progressPercentage = calculateProgressBar(points, level);

  return (
    <div className={styles["level"]}>
      <div className={styles["progress"]}>
        <div style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <p className={styles["level-span"]}>
        Level: {getLevelByPoints(points)}/5
      </p>
      <img
        className={styles["arrow-icon"]}
        src={ArrowIcon}
        alt={""}
        width={20}
      />
    </div>
  );
};

export default ProgressBar;
