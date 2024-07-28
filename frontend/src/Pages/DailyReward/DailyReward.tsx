import styles from "./DailyReward.module.css";
import DailyRewardIcon from "../../images/daily-reward-page.png";
import { dollarCoin } from "../../images";
import { DAILY_REWARDS, DAILY_REWARDS_BY_DAY } from "../../utils/consts.ts";
import { addDays, formatISO, isSameDay } from "date-fns";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../main.tsx";
import { useOutletContext } from "react-router-dom";

const DailyReward = () => {
  const { userData, setUserData } = useOutletContext();

  console.log(userData, "userData");

  const claimDailyReward = async () => {
    if (!userData) return;

    const today = new Date();
    const todayString = formatISO(today, { representation: "date" });

    const userDocRef = doc(db, "users", userData.username);
    const dailyRewardDocRef = doc(
      db,
      "users",
      userData.username,
      "dailyRewards",
      todayString,
    );

    const dailyRewardDocSnap = await getDoc(dailyRewardDocRef);

    if (dailyRewardDocSnap.exists() && dailyRewardDocSnap.data().claimed) {
      // setError('Вы уже получили свою ежедневную награду сегодня.');
      return;
    }

    let newConsecutiveDays = userData.consecutiveDays;

    if (userData.lastClaimedDate) {
      const lastClaimedDate = new Date(userData.lastClaimedDate);
      if (isSameDay(addDays(lastClaimedDate, 1), today)) {
        newConsecutiveDays += 1;
      } else if (!isSameDay(lastClaimedDate, today)) {
        newConsecutiveDays = 1;
      }
    } else {
      newConsecutiveDays = 1;
    }

    const rewardPoints = DAILY_REWARDS_BY_DAY[userData.consecutiveDays]; // Определите вашу логику начисления очков здесь
    const newTotalPoints = userData.points + rewardPoints;

    try {
      await setDoc(dailyRewardDocRef, {
        points: rewardPoints,
        claimed: true,
      });

      await updateDoc(userDocRef, {
        points: newTotalPoints,
        lastClaimedDate: todayString,
        consecutiveDays: newConsecutiveDays,
      });

      setUserData((prevUser: any) => ({
        ...prevUser,
        points: newTotalPoints,
        lastClaimedDate: todayString,
        consecutiveDays: newConsecutiveDays,
        hasClaimedToday: true,
      }));

      // setError(null);
    } catch (err) {
      // setError('Не удалось получить ежедневную награду');
    }
  };

  console.log(userData, "userData");

  return (
    <div className={styles["daily-reward"]}>
      <img className={styles["daily-icon"]} src={DailyRewardIcon} alt={""} />
      <h1>Daily reward</h1>
      <p className={styles["subtitle"]}>
        Accrue coints for logging into the game daily without skipping
      </p>
      <ul className={styles["daily-list"]}>
        {DAILY_REWARDS.map((reward, index) => {
          const isActive = index < userData?.consecutiveDays;

          return (
            <li
              key={index}
              className={` ${isActive ? styles["daily-item-active"] : styles["daily-item"]}`}
            >
              Day {index + 1}
              <img
                src={dollarCoin}
                alt="Dollar Coin"
                className="w-[18px] h-[18px]"
              />
              {reward}
            </li>
          );
        })}
      </ul>
      <button
        onClick={claimDailyReward}
        className={`${styles["claim-button"]} ${userData?.hasClaimedToday ? styles["claim-button-disabled"] : ""}`}
      >
        {userData?.hasClaimedToday ? "Come back tomorrow" : "Claim"}
      </button>
    </div>
  );
};

export default DailyReward;
