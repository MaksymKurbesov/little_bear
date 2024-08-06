import styles from "./App.module.css";
import Header from "./SharedUI/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./SharedUI/Menu/Menu";
import { useEffect, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { useGetUserQuery } from "./Stores/slices/apiSlice.ts";
import { useAppState } from "./Stores/AppStateContext.tsx";
import StartBearVideo from "./Pages/StartBearVideo/StartBearVideo.tsx";
import LoadingScreen from "./Pages/LoadingScreen/LoadingScreen.tsx";
import { getLittleBearId } from "./utils/helpers.ts";
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
  const { dispatch } = useAppState();
  const [userIsRegistered, setUserIsRegistered] = useState<boolean>(false);
  const location = useLocation();
  const backgroundClassName = BACKGROUND_MAP[location.pathname];

  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [videoIsEnd, setVideoIsEnd] = useState(false);

  useEffect(() => {
    if (!user || !user.username) return;

    const userService = new UserService(dispatch);

    if (userData) {
      userService.setUserData(userData).then(() => {
        setUserIsRegistered(true);
      });
    }

    if (error && error.data === "Document does not exist") {
      const refID = getLittleBearId(location.search) || "";
      const isPremium = !!user.is_premium;
      userService.registerUser(user, refID, isPremium).then(() => {
        setUserIsRegistered(false);
      });
    }
  }, [user, userData, dispatch, error, location.search]);

  if (isLoadingScreen) {
    return <LoadingScreen setIsLoadingScreen={setIsLoadingScreen} />;
  }

  if (!userIsRegistered) {
    return (
      <StartBearVideo
        setUserIsRegistered={setUserIsRegistered}
        setVideoIsEnd={setVideoIsEnd}
      />
    );
  }

  return (
    <div className={`${styles["game-wrapper"]} ${styles[backgroundClassName]}`}>
      {videoIsEnd && <RegisteredModal />}
      <Header />
      <Outlet />
      <Menu />
    </div>
  );
};

export default App;
