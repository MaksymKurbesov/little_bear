import styles from "./RegisteredModal.module.css";
const RegisteredModal = () => {
  const closeHandler = (e) => {
    e.target.parentElement.parentElement.remove();
  };

  return (
    <div className={styles["registered-modal-wrapper"]}>
      <div className={styles["registered-modal"]}>
        <h1>🎉 Welcome to Little Bear! 🎉</h1>
        <p className={styles["first-players"]}>
          Get ready to groove with your dancing bear! <br />
          Here's how to play:
        </p>
        <ul className={styles["instruction-list"]}>
          <li>
            <h2>🐻 Tap the Bear: </h2>
            <p>
              Keep tapping on the bear to make sure the dance continues. Every
              tap helps the bear keep moving!
            </p>
          </li>
          <li>
            <h2>💰 Earn Points:</h2>
            <p>
              Each tap earns you points. The more you tap, the more points you
              get!
            </p>
          </li>
          <li>
            <h2>🚀 Level Up:</h2>
            <p>
              Accumulate points to level up and unlock new dance moves. How far
              can you go?
            </p>
          </li>
        </ul>
        {/*<p className={styles["bonus-skin"]}>*/}
        {/*  Your bonus skin is activated for 24 hours!*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*  Use it to conquer the heights and show off your skills! After this*/}
        {/*  time, you can earn this and other skins by reaching certain point*/}
        {/*  milestones.*/}
        {/*</p>*/}
        <button onClick={closeHandler} className={styles["close"]}>
          Close
        </button>
      </div>
    </div>
  );
};

export default RegisteredModal;
