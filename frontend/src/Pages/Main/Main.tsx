import styles from "./Main.module.css";
import { useEffect, useRef, useState } from "react";
import { dailyReward, dollarCoin, mainCharacter } from "../../images";
import { calculateTimeLeft } from "../../utils/helpers";
import { NavLink, useOutletContext } from "react-router-dom";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../main";
import AncientBorder from "../../images/ancient-border.svg";
import LittleBearCoin from "../../images/coin.png";
import { Canvas } from "@react-three/fiber";
import { Model } from "../../Box.tsx";

const pointsToAdd = 11;

const Main = () => {
  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");

  const [earnedPoints, setEarnedPoints] = useState(0);
  const [clickedPoints, setClickedPoints] = useState(0);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );

  const { userData } = useOutletContext();
  const userDataRef = useRef(userData);

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  useEffect(() => {
    const sendPointsToServer = async () => {
      try {
        if (clickedPoints > 0) {
          console.log("sending data...");

          const userRef = doc(db, "users", userData?.username);
          await runTransaction(db, async (transaction) => {
            const doc = await transaction.get(userRef);
            if (!doc.exists) {
              throw "Документ не существует!";
            }

            const newCount = doc.data().points + clickedPoints;
            transaction.update(userRef, { points: newCount });
          });

          setClickedPoints(0);
        }
      } catch (e) {}
    };

    const interval = setInterval(() => {
      sendPointsToServer();
    }, 3000); // Отправка данных каждые 5 секунд

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [clickedPoints]);

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
  };

  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
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
    <div className={styles["main"]}>
      {/*<div className={`${styles["main-wrapper"]}`}>*/}
      {/*<div className={styles["daily-reward"]}>*/}
      {/*  <NavLink to={"/daily-reward"}>*/}
      {/*    <div className={styles["daily-reward-wrapper"]}>*/}
      {/*      <div className={styles["dot"]}></div>*/}
      {/*      <img*/}
      {/*        src={dailyReward}*/}
      {/*        alt="Daily Reward"*/}
      {/*        className="mx-auto w-7 h-7"*/}
      {/*      />*/}
      {/*      <div>*/}
      {/*        <p className="text-[8px] text-center text-white">Daily reward</p>*/}
      {/*        <p className="text-[10px] font-medium text-center text-gray-400">*/}
      {/*          {dailyRewardTimeLeft}*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </NavLink>*/}
      {/*</div>*/}

      <div className="flex justify-center">
        <div className={styles["points"]}>
          <img
            src={LittleBearCoin}
            alt="Dollar Coin"
            className={styles["dollar-coin"]}
          />
          <p className="text-4xl text-white">
            {userData
              ? (userData?.points + earnedPoints).toLocaleString()
              : "-"}
          </p>
        </div>
      </div>

      <div className={styles["main-image-wrapper"]} onClick={handleCardClick}>
        <>
          <Canvas>
            <Model />
          </Canvas>
        </>
      </div>
      {clicks.map((click) => (
        <div
          key={click.id}
          className={`${styles["earned-points"]} absolute text-5xl font-bold opacity-0 text-white pointer-events-none`}
          style={{
            top: `${click.y - 50}px`,
            left: `${click.x - 50}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          +{pointsToAdd}
        </div>
      ))}
      {/*</div>*/}
    </div>
  );
};

export default Main;
