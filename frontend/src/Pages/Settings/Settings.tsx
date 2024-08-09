import styles from "./Settings.module.css";
import Select from "../../SharedUI/Select/Select.tsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const Settings = () => {
  const { t } = useTranslation();

  const savedSetting = localStorage.getItem("vibrationEnabled") === "true";
  const [vibrationEnabled, setVibrationEnabled] = useState(savedSetting);

  const handleToggle = () => {
    const newSetting = !vibrationEnabled;
    setVibrationEnabled(newSetting);
    localStorage.setItem("vibrationEnabled", newSetting);
  };

  useEffect(() => {
    setVibrationEnabled(savedSetting);
  }, []);

  return (
    <div className={styles["settings"]}>
      <h1 className={"page-title"}>Settings</h1>
      <Select />
      <div className={styles["switch-wrapper"]}>
        Haptic Feedback
        <label className={styles["switch"]}>
          <input
            type="checkbox"
            checked={vibrationEnabled}
            onChange={handleToggle}
          />
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
        <a
          className={styles["link"]}
          href={"https://t.me/little_bear_official"}
        >
          {t("Our channel")}
        </a>
        <a
          className={styles["link"]}
          target={"_blank"}
          href={"https://t.me/+uxQafEGkMLdjMDJi"}
        >
          Our chat
        </a>
      </div>
    </div>
  );
};

export default Settings;
