import styles from "./App.module.css";
import Header from "./SharedUI/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./SharedUI/Menu/Menu";
import { useEffect, useRef, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { useGetUserQuery } from "./Stores/slices/apiSlice.ts";
import { useAppState } from "./Stores/AppStateContext.tsx";
import { userService } from "./main.tsx";
import LoadingScreenImage from "./images/loading screen.png";

import StartBearVideo from "./Pages/StartBearVideo/StartBearVideo.tsx";
import { generateUserData } from "./utils/helpers.ts";
import { IUser } from "./Api/UserService.ts";

const App = () => {
  const { user, userID } = useTelegram();
  const { data: userData, error, isLoading } = useGetUserQuery(userID);
  const { state, dispatch } = useAppState();

  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [videoIsEnd, setVideoIsEnd] = useState(false);

  const scrollableRef = useRef(null);

  const location = useLocation();
  const isPlayPage = location.pathname === "/";

  const onEndVideoHandler = () => {
    setVideoIsEnd(true);
  };

  useEffect(() => {
    if (!user || !user.username) return;

    if (userData) {
      dispatch({ type: "SET_POINTS", payload: userData.points });
      dispatch({ type: "SET_USER", payload: userData });
      userService.checkDailyReward(userData.id, dispatch);
      setUserIsRegistered(true);
    }

    if (error && error.data === "Document does not exist") {
      const registeredUser: IUser = generateUserData(user.username, user.id);
      userService.addUser(registeredUser);
      dispatch({ type: "SET_USER", payload: registeredUser });
    }
  }, [user, userData, dispatch]);

  if (isLoading || !state.user) {
    return (
      <div className={styles["loading-screen"]}>
        <img src={LoadingScreenImage} alt={""} />
      </div>
    );
  }

  if (!userIsRegistered && !videoIsEnd) {
    return <StartBearVideo onEndVideoHandler={onEndVideoHandler} />;
  }

  return (
    <div
      className={`${styles["game-wrapper"]} ${isPlayPage ? styles["background-image"] : ""}`}
    >
      <Header user={state.user} />
      <Outlet context={{ scrollableRef }} />
      <Menu />
    </div>
  );
};

export default App;
