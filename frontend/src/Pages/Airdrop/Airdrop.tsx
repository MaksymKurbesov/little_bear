import styles from "./Airdrop.module.css";

const Airdrop = () => {
  return (
    <div className={`${styles.airdrop} main`}>
      <h2>⏳ Time remaining until the next airdrop:</h2>
      <div className={styles["countdown"]}>
        <p>
          45 <span>days</span> 17 <span>hours</span> 12 <span>minutes</span> 53{" "}
          <span>seconds</span>
        </p>
      </div>
      <h3>💡 What is an airdrop?</h3>
      <p>An airdrop is bonus points you receive absolutely free!</p>
      <h3>🔥 How does it work?</h3>
      <ul>
        <li>• Keep an eye on the timer</li>
        <li>• When it hits zero, collect your bonus points</li>
        <li>• Don’t miss out to boost your score!</li>
      </ul>
      <h3>Tip:</h3>
      <p>📢 Notifications on? This way, you won’t miss any airdrop!</p>
      <button className={styles["take-airdrop-button"]}>
        Airdrop unavailable 😢
      </button>
    </div>
  );
};

export default Airdrop;
