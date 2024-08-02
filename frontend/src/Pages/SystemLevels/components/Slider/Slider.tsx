import styles from "./Slider.module.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import BearSkin1 from "../../../../images/skins/brickie.png";
import BearSkin2 from "../../../../images/skins/stony.png";
import BearSkin3 from "../../../../images/skins/acidlover.png";
import ProgressBar from "../../../Main/components/ProgressBar/ProgressBar.tsx";
import { useEffect, useRef, useState } from "react";
import ArrowIcon from "../../../../icons/arrow.svg";
import { useImagePreloader } from "../../../../hooks/useImagePreloader.ts";

const Slider = ({ setCurrentSkin }) => {
  const swiperRef = useRef(null);
  const currentSkin = 1;
  // const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiper, setSwiper] = useState<Swiper>();
  const imageUrls = [BearSkin1, BearSkin2, BearSkin3];
  const imagesLoaded = useImagePreloader(imageUrls);

  useEffect(() => {
    if (!swiper) return;

    const handleSlideChange = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    console.log("swiper.on");
    swiper.on("slideChange", handleSlideChange);
    swiper.on("reachEnd", () => setIsEnd(true));
    swiper.on("reachBeginning", () => setIsBeginning(true));

    return () => {
      swiper.off("slideChange", handleSlideChange);
      swiper.off("reachEnd");
      swiper.off("reachBeginning");
    };
  }, [swiper]);

  if (!imagesLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      onSwiper={(swiper) => {
        console.log(swiper, "on swiper");
        setSwiper(swiper);
      }}
      onSlideChange={(e) => {
        setCurrentSkin(e.activeIndex);
      }}
    >
      <SwiperSlide className={styles["slide"]}>
        {/*<div className={`${styles["orb"]} `}></div>*/}
        <img src={BearSkin1} alt={""} width={220} />
        <div className={styles["info"]}>
          <p className={styles["experience"]}>2.5K / 5K</p>
          <div className={styles["progress-bar"]}>
            <div></div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className={`${styles["slide"]} ${styles["red-slide"]}`}>
        {/*<div className={`${styles["orb"]} ${styles["red-orb"]}`}></div>*/}
        <img src={BearSkin2} alt={""} width={220} />
        <div className={styles["info"]}>
          <p className={styles["experience"]}>5K / 15K</p>
          <div
            className={`${styles["progress-bar"]} ${styles["progress-bar-red"]}`}
          >
            <div></div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className={`${styles["slide"]} ${styles["green-slide"]}`}>
        <img src={BearSkin3} alt={""} width={220} />

        <div className={styles["info"]}>
          <p className={styles["experience"]}>15K / 50K</p>
          <div
            className={`${styles["progress-bar"]} ${styles["progress-bar-green"]}`}
          >
            <div></div>
          </div>
        </div>
      </SwiperSlide>
      {/*<SwiperSlide className={styles["slide"]}>*/}
      {/*  <img src={BearSkin2} alt={""} width={220} />*/}
      {/*  <p className={styles["experience"]}>50K / 150K</p>*/}
      {/*</SwiperSlide>*/}
      {/*<div className={styles["slider-arrows"]}>*/}
      <button
        onClick={() => {
          swiper.slidePrev();
        }}
        className={`${styles["arrow-prev"]} ${isBeginning ? styles["hidden"] : ""}`}
      >
        <img src={ArrowIcon} alt={""} width={50} />
      </button>
      <button
        onClick={() => {
          swiper.slideNext();
        }}
        className={`${styles["arrow-next"]} ${isEnd ? styles["hidden"] : ""}`}
      >
        <img src={ArrowIcon} alt={""} width={50} />
      </button>
      {/*</div>*/}
    </Swiper>
  );
};

export default Slider;
