import styles from "./Points.module.css";
import BearIcon from "../../../../images/default-coin.png";
import { useState } from "react";

const Points = ({ points, isBouncing }) => {
  console.log(isBouncing, "isBouncing");

  return (
    <div className={styles["points"]}>
      <img
        src={BearIcon}
        alt=""
        className={`${isBouncing ? styles["bounce-once"] : ""}`}
        width={50}
      />
      <p className="text-4xl text-white">
        {points ? points.toLocaleString() : 0}
      </p>
    </div>
  );
};

export default Points;
