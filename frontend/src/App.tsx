import styles from "./App.module.css";
import Header from "./SharedUI/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./SharedUI/Menu/Menu";
import { useEffect, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { useGetUserQuery } from "./Stores/slices/apiSlice.ts";
import { useAppState } from "./Stores/AppStateContext.tsx";
import { userService } from "./main.tsx";

import StartBearVideo from "./Pages/StartBearVideo/StartBearVideo.tsx";
import { generateUserData, simulateLoadingProgress } from "./utils/helpers.ts";
import { IUser } from "./Api/UserService.ts";
import RegisteredModal from "./SharedUI/RegisteredModal/RegisteredModal.tsx";
import LoadingScreen from "./SharedUI/LoadingScreen/LoadingScreen.tsx";

const BACKGROUND_MAP = {
  "/": "background-image-main",
  "/airdrop": "background-image-airdrop",
  "/skins": "background-image-skins",
};

const App = () => {
  const { user, userID } = useTelegram();
  const { data: userData, error, isLoading } = useGetUserQuery(userID);
  const { state, dispatch } = useAppState();

  const [userIsRegistered, setUserIsRegistered] = useState<boolean | null>(
    null,
  );
  const [videoIsEnd, setVideoIsEnd] = useState(false);

  const location = useLocation();

  const backgroundClassName = BACKGROUND_MAP[location.pathname];

  const onEndVideoHandler = () => {
    setVideoIsEnd(true);
  };

  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setLoadingComplete(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    simulateLoadingProgress(setProgress);
  }, []);

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
      // userService.addUser(registeredUser);
      dispatch({ type: "SET_USER", payload: registeredUser });
    }
  }, [user, userData, dispatch, error]);

  // if (!loadingComplete) {
  //   return <LoadingScreen progress={progress} />;
  // }
  //
  // if (!userIsRegistered && !videoIsEnd) {
  //   return <StartBearVideo onEndVideoHandler={onEndVideoHandler} />;
  // }

  return (
    <div className={`${styles["game-wrapper"]} ${styles[backgroundClassName]}`}>
      {!userIsRegistered && !isLoading ? (
        <RegisteredModal userIsRegistered={userIsRegistered} />
      ) : null}
      <Header user={state.user} />
      <Outlet />
      <Menu />
    </div>
  );
};

export default App;
