import styles from "./Points.module.css";
import BearIcon from "../../../images/default-coin.webp";

const Points = ({ points }) => {
  return (
    <div className={styles["points"]}>
      <img
        src={BearIcon}
        alt=""
        // className={`${isBouncing ? styles["bounce-once"] : ""}`}
        width={50}
        height={50}
      />
      <p className="text-4xl text-white">{points.toLocaleString()}</p>
    </div>
  );
};

export default Points;
