import styles from "./App.module.css";
import Header from "./SharedUI/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./SharedUI/Menu/Menu";
import { useEffect, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { useGetUserQuery } from "./Stores/slices/apiSlice.ts";
import { useAppState } from "./Stores/AppStateContext.tsx";
import StartBearVideo from "./Pages/StartBearVideo/StartBearVideo.tsx";
import LoadingScreen from "./SharedUI/LoadingScreen/LoadingScreen.tsx";
import { getLittleBearId, simulateLoadingProgress } from "./utils/helpers.ts";
import RegisteredModal from "./SharedUI/RegisteredModal/RegisteredModal.tsx";

import UserService from "./Services/UserService.ts";

const BACKGROUND_MAP = {
  "/": "background-image-main",
  "/airdrop": "background-image-airdrop",
  "/skins": "background-image-skins",
};

const App = () => {
  const { user } = useTelegram();
  const { data: userData, error, isLoading } = useGetUserQuery(user?.id);
  const { state, dispatch } = useAppState();
  const [userIsRegistered, setUserIsRegistered] = useState<boolean>(false);
  const [videoIsEnd, setVideoIsEnd] = useState(false);
  const location = useLocation();
  const backgroundClassName = BACKGROUND_MAP[location.pathname];

  const onEndVideoHandler = () => {
    setVideoIsEnd(true);
  };

  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (!user || !user.username) return;

    const userService = new UserService(dispatch);

    if (userData) {
      userService.setUserData(userData);
      setUserIsRegistered(true); //
    }

    if (error && error.data === "Document does not exist") {
      const refID = getLittleBearId(location.search) || "";
      const isPremium = !!user.is_premium;
      userService.registerUser(user, refID, isPremium);
      setUserIsRegistered(false);
    }
  }, [user, userData, dispatch, error, location.search]);

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

  if (!loadingComplete) {
    return <LoadingScreen progress={progress} />;
  }

  if (!userIsRegistered && !videoIsEnd) {
    return <StartBearVideo onEndVideoHandler={onEndVideoHandler} />;
  }

  return (
    <div className={`${styles["game-wrapper"]} ${styles[backgroundClassName]}`}>
      {!userIsRegistered && !isLoading && (
        <RegisteredModal userIsRegistered={userIsRegistered} />
      )}
      <Header user={state.user} />
      <Outlet />
      <Menu />
    </div>
  );
};

export default App;
