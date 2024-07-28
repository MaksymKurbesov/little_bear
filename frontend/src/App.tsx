import styles from "./App.module.css";
import Header from "./SharedUI/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./SharedUI/Menu/Menu";
import { useEffect, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { setDoc, doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "./main";
import { formatISO } from "date-fns";
import { generateUserData } from "./utils/helpers.ts";

const levelThresholds = [0, 100, 300, 600, 1000, 8500, 15000];

const App = () => {
  const { tg, user } = useTelegram();
  const [userData, setUserData] = useState<null | DocumentData>(null);
  const location = useLocation();
  const [points, setPoints] = useState(0); // Очки для текущего уровня
  const [level, setLevel] = useState(0); // Текущий уровень

  const isPlayPage = location.pathname === "/";
  const pointsSinceLastLevel = points - levelThresholds[level];
  const pointsToNextLevel = levelThresholds[level + 1] - levelThresholds[level];
  const progressPercentage = (pointsSinceLastLevel / pointsToNextLevel) * 100;

  useEffect(() => {
    //   if (!userData) return;
    //
    //   const points = userData.points;
    //
    //   if (points >= maxPoints) {
    //     setPoints(points - maxPoints); // Переносим излишек очков на следующий уровень
    //   }
    //
    const newLevel = levelThresholds.findIndex(
      (threshold) => points < threshold,
    );

    setLevel(newLevel > 0 ? newLevel - 1 : levelThresholds.length - 1);
  }, [points]);

  const fetchUserData = async () => {
    const userRef = doc(db, "users", user?.username);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const registeredUser = generateUserData(user?.username);

      await setDoc(userRef, registeredUser);
      setUserData(registeredUser);
    } else {
      setUserData(userSnap.data());
      setPoints(userSnap.data().points);
    }

    const today = new Date();
    const todayString = formatISO(today, { representation: "date" });
    const dailyRewardDocRef = doc(
      db,
      "users",
      user?.username,
      "dailyRewards",
      todayString,
    );
    const dailyRewardDocSnap = await getDoc(dailyRewardDocRef);

    if (dailyRewardDocSnap.exists() && dailyRewardDocSnap.data().claimed) {
      setUserData((prevState) => ({
        ...prevState,
        hasClaimedToday: true,
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        hasClaimedToday: false,
      }));
    }
  };

  useEffect(() => {
    tg.ready();

    if (!user.username) return;

    fetchUserData();
  }, []);

  return (
    <div
      className={`${styles["game-wrapper"]} ${isPlayPage ? styles["background-image"] : ""}`}
    >
      {userData && (
        <Header
          userData={userData}
          level={level}
          progressPercentage={progressPercentage}
        />
      )}
      <Outlet context={{ userData: userData, setUserData }} />
      <Menu />
    </div>
  );
};

export default App;
