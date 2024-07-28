import styles from "./Settings.module.css";
import ArrowIcon from "../../icons/arrow.svg";

const Settings = () => {
  return (
    <div className={styles["settings"]}>
      <h1 className={"page-title"}>Settings</h1>
      <div className={styles["select"]}>
        <p>Select language</p>
        <span>English</span>
        <img src={ArrowIcon} alt={""} width={25} />
      </div>
      <div className={styles["switch-wrapper"]}>
        Haptic Feedback
        <label className={styles["switch"]}>
          <input type="checkbox" />
          <span className={`${styles["slider"]} ${styles["round"]}`}></span>
        </label>
      </div>
      <div className={styles["switch-wrapper"]}>
        Bear animation
        <label className={styles["switch"]}>
          <input type="checkbox" />
          <span className={`${styles["slider"]} ${styles["round"]}`}></span>
        </label>
      </div>
      <div className={styles["links-wrapper"]}>
        <a className={styles["link"]} href={"#"}>
          Our channel
        </a>
        <a className={styles["link"]} href={"#"}>
          Our chat
        </a>
      </div>
    </div>
  );
};

export default Settings;
