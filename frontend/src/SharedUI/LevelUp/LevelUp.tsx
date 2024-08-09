import styles from "./LevelUp.module.css";
import LevelUpIcon from "../../images/level-up.svg";

const LevelUp = ({ level, onCollectHandler }) => {
  return (
    <div className={styles["level-up"]}>
      <h2>You've just reached Level {level}</h2>
      <img src={LevelUpIcon} width={200} alt={""} />
      <p className={styles["description"]}>
        As a reward, you’ve unlocked a brand new <span>bear outfit</span>, an
        exciting <span>dance move</span>, and a fresh <span>environment</span>{" "}
        to groove in! <br />
        <br />
        Get ready to see your bear in a whole new style, with dances that are
        more fun than ever.
      </p>
      <button className={styles["collect"]} onClick={onCollectHandler}>
        Collect
      </button>
    </div>
  );
};

export default LevelUp;
