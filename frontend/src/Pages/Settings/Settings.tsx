import styles from "./Settings.module.css";
import Select from "../../SharedUI/Select/Select.tsx";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["settings"]}>
      <h1 className={"page-title"}>Settings</h1>
      <Select />
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
          {t("Our channel")}
        </a>
        <a className={styles["link"]} href={"#"}>
          Our chat
        </a>
      </div>
    </div>
  );
};

export default Settings;
