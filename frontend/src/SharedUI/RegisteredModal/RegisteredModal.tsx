import styles from "./RegisteredModal.module.css";
import { useEffect, useState } from "react";

const RegisteredModal = ({ userIsRegistered }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (userIsRegistered) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles["registered-modal-wrapper"]}>
      <div className={styles["registered-modal"]}>
        <h1>Welcome to Little Bear!</h1>
        <p className={styles["first-players"]}>
          We are excited to have you among the first players! To celebrate, we
          are giving you an <span>exclusive skin</span> to enhance your gaming
          experience right from the start!
        </p>
        <p className={styles["bonus-skin"]}>
          Your bonus skin is activated for 24 hours!
        </p>
        <p>
          Use it to conquer the heights and show off your skills! After this
          time, you can earn this and other skins by reaching certain point
          milestones.
        </p>
        <button onClick={closeHandler} className={styles["close"]}>
          Close
        </button>
        {/*<button className={styles["close-button"]}>*/}
        {/*  <span></span>*/}
        {/*  <span></span>*/}
        {/*</button>*/}
      </div>
    </div>
  );
};

export default RegisteredModal;
