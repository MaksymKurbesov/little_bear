import styles from "./App.module.css";
import Header from "./SharedUI/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./SharedUI/Menu/Menu";
import { useEffect, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";

import { calculateProgressBar, getLevelByPoints } from "./utils/helpers.ts";
import { useGetUserQuery } from "./Stores/slices/apiSlice.ts";
import { useAppState } from "./Stores/AppStateContext.tsx";

const App = () => {
  const { tg, user, userID } = useTelegram();
  const { data: userData, error, isLoading } = useGetUserQuery(userID);
  const { state, dispatch } = useAppState();

  const location = useLocation();
  const isPlayPage = location.pathname === "/";

  useEffect(() => {
    if (userData) {
      dispatch({ type: "SET_POINTS", payload: userData.points });
      dispatch({ type: "SET_USER", payload: userData });
    }
  }, [userData, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${styles["game-wrapper"]} ${isPlayPage ? styles["background-image"] : ""}`}
    >
      <Header />
      <Outlet context={{ userData: userData }} />
      <Menu />
    </div>
  );
};

export default App;
