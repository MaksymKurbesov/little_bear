import styles from "./App.module.css";
import Header from "./SharedUI/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./SharedUI/Menu/Menu";
import { useEffect, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import {
  setDoc,
  doc,
  getDoc,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { db, userService } from "./main";
import { generateUserData, getLittleBearId } from "./utils/helpers.ts";

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
    const fetchUser = async () => {
      const userData = await userService.getUser(user.username);

      if (userData) {
        setUserData(userData);
        setPoints(userData.points);
      } else {
        const registeredUser = generateUserData(user.username, user.id);
        await userService.addUser(registeredUser);
        setUserData(registeredUser);
      }

      await userService.checkDailyReward(user.username, setUserData);
    };

    fetchUser();

    const newLevel = levelThresholds.findIndex(
      (threshold) => points < threshold,
    );

    setLevel(newLevel > 0 ? newLevel - 1 : levelThresholds.length - 1);
  }, [points]);

  useEffect(() => {
    tg.ready();

    if (!user?.username) return;

    const userRef = doc(db, "users", user?.username);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      const data = doc.data();
      if (data) {
        setPoints(data.points); // Получение общего количества очков
      }
    });

    return () => unsubscribe();
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
