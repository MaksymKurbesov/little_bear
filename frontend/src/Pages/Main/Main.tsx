import styles from "./Main.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  dailyCipher,
  dailyCombo,
  dailyReward,
  dollarCoin,
  mainCharacter,
} from "../../images";
import { calculateTimeLeft, debounce } from "../../utils/helpers";
import { useOutletContext } from "react-router-dom";
import { doc, increment, updateDoc, runTransaction } from "firebase/firestore";
import { db } from "../../main";

const pointsToAdd = 11;

const Main = () => {
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [clickedPoints, setClickedPoints] = useState(0);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  const { userData } = useOutletContext();
  const userDataRef = useRef(userData);

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  useEffect(() => {
    const sendPointsToServer = async (clickedPoints) => {
      if (clickedPoints > 0) {
        try {
          const userRef = doc(db, "users", userData?.username);
          await runTransaction(db, async (transaction) => {
            const doc = await transaction.get(userRef);
            if (!doc.exists) {
              throw "Документ не существует!";
            }

            const newCount = doc.data().points + clickedPoints;
            transaction.update(userRef, { points: newCount });

            setClickedPoints(0);
          });
        } catch (e) {}
      }
    };

    const interval = setInterval(() => {
      sendPointsToServer(clickedPoints);
    }, 3000); // Отправка данных каждые 5 секунд

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, []);

  // const debouncedSendPointsToServer = debounce(() => {
  //   sendPointsToServer(earnedPoints, userData.username);
  // }, 2000);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = "";
    }, 100);

    setEarnedPoints((prevState) => prevState + pointsToAdd);
    setClickedPoints((prevState) => prevState + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);

    // debouncedSendPointsToServer(earnedPoints, userDataRef.current.username);
  };

  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute
    // const pointsInterval = setInterval(() => {
    //   setEarnedPoints((prevTime) => prevTime + pointsToAdd);
    // }, 3600000);

    return () => {
      clearInterval(interval);
      // clearInterval(pointsInterval);
    };
  }, []);

  return (
    <div className={`${styles["main"]} flex-grow mt-4`}>
      <div
        className={`${styles["test-image"]} absolute top-[2px] left-0 right-0 bottom-0 rounded-t-[46px]`}
      >
        <div className="px-4 mt-6 flex justify-between gap-2">
          <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
            <div className="dot"></div>
            <img
              src={dailyReward}
              alt="Daily Reward"
              className="mx-auto w-12 h-12"
            />
            <p className="text-[10px] text-center text-white mt-1">
              Daily reward
            </p>
            <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
              {dailyRewardTimeLeft}
            </p>
          </div>
          <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
            <div className="dot"></div>
            <img
              src={dailyCipher}
              alt="Daily Cipher"
              className="mx-auto w-12 h-12"
            />
            <p className="text-[10px] text-center text-white mt-1">
              Daily cipher
            </p>
            <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
              {dailyCipherTimeLeft}
            </p>
          </div>
          <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
            <div className="dot"></div>
            <img
              src={dailyCombo}
              alt="Daily Combo"
              className="mx-auto w-12 h-12"
            />
            <p className="text-[10px] text-center text-white mt-1">
              Daily combo
            </p>
            <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
              {dailyComboTimeLeft}
            </p>
          </div>
        </div>

        <div className="px-4 mt-4 flex justify-center">
          <div className="px-4 py-2 flex items-center space-x-2">
            <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
            <p className="text-4xl text-white">
              {userData
                ? (userData?.points + earnedPoints).toLocaleString()
                : "-"}
            </p>
            {/*<p className={styles["point"]}>+{pointsToAdd}</p>*/}
          </div>
        </div>

        <div className="px-4 mt-4 flex justify-center">
          <div
            className={`${styles["circle-outer"]} w-80 h-80 p-4 rounded-full`}
            onClick={handleCardClick}
          >
            <div className={`${styles["circle-inner"]}  rounded-full`}>
              <img
                onDragStart={(e) => e.preventDefault()}
                className={styles["main-image"]}
                src={mainCharacter}
                alt="Main Character"
              />
            </div>
          </div>
        </div>
        {clicks.map((click) => (
          <div
            key={click.id}
            className={`${styles["points"]} absolute text-5xl font-bold opacity-0 text-white pointer-events-none`}
            style={{
              top: `${click.y - 150}px`,
              left: `${click.x}px`,
              animation: `float 1s ease-out`,
            }}
            onAnimationEnd={() => handleAnimationEnd(click.id)}
          >
            +{pointsToAdd}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
