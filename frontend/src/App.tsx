import styles from "./App.module.css";
import Header from "./SharedUI/Header/Header";
import { Outlet } from "react-router-dom";
import Menu from "./SharedUI/Menu/Menu";
import { useEffect, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { setDoc, doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "./main";

const mockUserData = {
  points: 0,
  profitPerHour: 0,
  status: "Bronze",
  username: "existenc3r",
};

const App = () => {
  const { tg, user } = useTelegram();
  const [userData, setUserData] = useState<null | DocumentData>(null);

  // console.log(tg.initDataUnsafe, "tg");
  // console.log(user, "user");

  const initUser = async () => {
    const userRef = doc(db, "users", user?.username);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        username: user?.username,
        points: 0,
        profitPerHour: 0,
        status: "Bronze",
      });
    } else {
      setUserData(userSnap.data());
    }
  };

  useEffect(() => {
    tg.ready();

    if (!user?.username) return;

    initUser();
  }, []);

  return (
    <div className="bg-black flex justify-center">
      <div className={`${styles["game-wrapper"]}`}>
        {userData && <Header userData={userData} />}
        <Outlet context={{ userData: userData }} />
        <Menu />
      </div>
    </div>
  );
};

export default App;
