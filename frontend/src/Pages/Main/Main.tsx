import styles from "./Main.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { userApi } from "../../main";
import BearIcon from "../../images/default-coin.png";
import { useAppState } from "../../Stores/AppStateContext.tsx";
import Bear from "./Bear/Bear.tsx";
import { POINTS_TO_ADD } from "../../utils/consts.ts";
import { useTelegram } from "../../hooks/useTelegram.ts";
import LoadSpinning from "../../SharedUI/LoadSpinning/LoadSpinning.tsx";
import { useImagePreloader } from "../../hooks/useImagePreloader.ts";
import BackgroundImage from "/bg.webp";
import Points from "./Points/Points.tsx";

const Main = () => {
  const { state, dispatch } = useAppState();

  const { user: UserTG } = useTelegram();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const imagesLoaded = useImagePreloader([BackgroundImage, BearIcon]);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleAnimationEnd = (id: number) => {
    dispatch({ type: "REMOVE_CLICK", payload: id });
  };

  const sendPointsToServer = useCallback(async () => {
    if (state.clickedPoints <= 0 || !UserTG) return;

    try {
      await userApi.sendPointsToServer(UserTG.id, state.clickedPoints);

      dispatch({ type: "RESET_CLICKED_POINTS" });
    } catch (error) {
      console.error("Error sending points to server:", error);
    }
  }, [state.clickedPoints, dispatch]);

  useEffect(() => {
    intervalRef.current = setInterval(sendPointsToServer, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sendPointsToServer]);

  if (!imagesLoaded) {
    return (
      <div className={"suspense"}>
        <LoadSpinning />
      </div>
    );
  }

  return (
    <div className={styles["main"]}>
      <Points points={state.points} isBouncing={isBouncing} />
      <Bear setIsBouncing={setIsBouncing} />

      {state.clicks.map((click) => (
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
          +{POINTS_TO_ADD}
        </div>
      ))}
    </div>
  );
};

export default Main;
