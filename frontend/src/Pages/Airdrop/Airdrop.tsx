import styles from "./Airdrop.module.css";
import BearCoin from "../../images/default-coin.png";
import OrangeBearCoin from "../../images/orange-coin.png";
import AirdropLogo from "../../images/airdrop-logo.png";
import { useImagePreloader } from "../../hooks/useImagePreloader.ts";
import LoadSpinning from "../../SharedUI/LoadSpinning/LoadSpinning.tsx";
import BackgroundImage from "/airdrop-bg.png";
import useCountdown from "../../hooks/useCountdown.ts";

const imageUrls = [BackgroundImage, BearCoin, OrangeBearCoin, AirdropLogo];

const Airdrop = () => {
  const imagesLoaded = useImagePreloader(imageUrls);
  const targetDate = "2024-10-01T23:59:59Z";

  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (!imagesLoaded) {
    return (
      <div className={"suspense"}>
        <LoadSpinning />
      </div>
    );
  }

  return (
    <div className={`${styles.airdrop} main`}>
      <img
        className={styles["airdrop-logo"]}
        src={AirdropLogo}
        alt={""}
        // width={250}
      />
      <div className={styles["coin"]}>
        <img
          className={styles["orange-bear-icon"]}
          src={OrangeBearCoin}
          alt={""}
          width={"100%"}
        />
        <img
          className={styles["bear-icon"]}
          src={BearCoin}
          alt={""}
          width={"100%"}
        />
      </div>
      <div className={styles["countdown-wrapper"]}>
        <p className={styles["remaining-text"]}>
          Time remaining until the airdrop
        </p>

        <div className={styles["countdown"]}>
          <div className={styles["dig"]}>
            <div>
              <p>{days}</p>
            </div>
            <span>days</span>
          </div>
          <div className={styles["dig"]}>
            <div>
              <p>{hours}</p>
            </div>
            <span>hours</span>
          </div>
          <div className={styles["dig"]}>
            <div>
              <p>{minutes}</p>
            </div>
            <span>minutes</span>
          </div>
          <div className={styles["dig"]}>
            <div>
              <p>{seconds}</p>
            </div>
            <span>seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Airdrop;
