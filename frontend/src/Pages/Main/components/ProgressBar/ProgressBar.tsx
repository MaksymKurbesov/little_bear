import styles from "./ProgressBar.module.css";
import ArrowIcon from "../../../../icons/arrow.svg";

const ProgressBar = ({ points, progressPercentage, level }) => {
  console.log(progressPercentage, "progressPercentage");

  return (
    <div className={styles["level"]}>
      <div className={styles["progress"]}>
        <div style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <p className={styles["level-span"]}>Level: {level}/7</p>
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
