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
  "/airdrop": "background-image-airdrop",
  "/skins": "background-image-skins",
};

const BEAR_BACKGROUNDS = [
  "background-image-main",
  "background-image-main2",
  "background-image-main3",
];

const App = () => {
  const { user } = useTelegram();
  const {
    data: userData,
    error,
    isLoading,
  } = useGetUserQuery(user?.id, {
    skip: !user?.id,
  });
  const { state, dispatch } = useAppState();
  const [userIsRegistered, setUserIsRegistered] = useState<boolean>(false);
  const location = useLocation();
  const backgroundClassName = BACKGROUND_MAP[location.pathname];
  const bearBackgroundCN = BEAR_BACKGROUNDS[state.level - 1];

  const [isLevelSpecified, setIsLevelSpecified] = useState(false);

  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [videoIsEnd, setVideoIsEnd] = useState(false);

  useEffect(() => {
    if (!user || !user.username) return;

    const userService = new UserService(dispatch);

    if (userData) {
      userService.setUserData(userData).then(() => {
        setIsLevelSpecified(true);
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

  console.log(userIsRegistered, "do usloviya userIsRegistered");
  console.log(isLoadingScreen, "isLoadingScreen");

  if (!userIsRegistered) {
    return (
      <StartBearVideo
        setUserIsRegistered={setUserIsRegistered}
        setVideoIsEnd={setVideoIsEnd}
      />
    );
  }

  console.log(userIsRegistered, "posle usloviya userIsRegistered");

  return (
    <div
      className={`${styles["game-wrapper"]} ${styles[backgroundClassName]} ${styles[bearBackgroundCN]}`}
    >
      {videoIsEnd && <RegisteredModal />}
      <Header pathname={location.pathname} />
      <Outlet />
      <Menu />
    </div>
  );
};

export default App;
