import styles from "./Main.module.css";
import { useCallback, useEffect, useRef } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../main";
import LittleBearCoin from "../../images/coin.png";
import { useAppState } from "../../Stores/AppStateContext.tsx";
import Bear from "./components/Bear/Bear.tsx";
import { POINTS_TO_ADD } from "../../utils/consts.ts";
import { useTelegram } from "../../hooks/useTelegram.ts";

const Main = () => {
  const { state, dispatch } = useAppState();

  const { tg, user: UserTG } = useTelegram();
  const userID = UserTG.id.toString();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleAnimationEnd = (id: number) => {
    dispatch({ type: "REMOVE_CLICK", payload: id });
  };

  const sendPointsToServer = useCallback(async () => {
    if (state.clickedPoints <= 0 || !userID) return;

    try {
      const userRef = doc(db, "users", userID);
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(userRef);
        if (!docSnap.exists()) {
          throw new Error("Документ не существует!");
        }

        const newCount = docSnap.data().points + state.clickedPoints;
        transaction.update(userRef, { points: newCount });
      });

      dispatch({ type: "RESET_CLICKED_POINTS" });
    } catch (error) {
      console.error("Error sending points to server:", error);
    }
  }, [state.clickedPoints, userID, dispatch]);

  useEffect(() => {
    intervalRef.current = setInterval(sendPointsToServer, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sendPointsToServer]);

  return (
    <div className={styles["main"]}>
      <div className="flex justify-center">
        <div className={styles["points"]}>
          <img
            src={LittleBearCoin}
            alt="Dollar Coin"
            className={styles["dollar-coin"]}
          />
          <p className="text-4xl text-white">
            {state.points ? state.points.toLocaleString() : "-"}
          </p>
        </div>
      </div>
      <Bear />

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
