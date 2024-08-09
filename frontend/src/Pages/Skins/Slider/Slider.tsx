import styles from "./Slider.module.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import BearSkin1 from "../../../images/skins/timber.png";
import BearSkin2 from "../../../images/skins/brickn.png";
import BearSkin3 from "../../../images/skins/neyon.png";
import OpenedBearSkin1 from "../../../images/skins/timber.png";
import OpenedBearSkin2 from "../../../images/skins/brickn-opened.png";
import OpenedBearSkin3 from "../../../images/skins/neyon-opened.png";

import { useEffect, useRef, useState } from "react";
import ArrowIcon from "../../../icons/arrow.svg";
import { useImagePreloader } from "../../../hooks/useImagePreloader.ts";
import LoadSpinning from "../../../SharedUI/LoadSpinning/LoadSpinning.tsx";
import { useAppState } from "../../../Stores/AppStateContext.tsx";
import SkinSlide from "../SkinSlide/SkinSlide.tsx";
import { SKINS } from "../../../utils/consts.ts";

const imageUrls = [
  BearSkin1,
  BearSkin2,
  BearSkin3,
  OpenedBearSkin1,
  OpenedBearSkin2,
  OpenedBearSkin3,
];

const Slider = ({ setCurrentSkin }) => {
  const swiperRef = useRef(null);
  const { state, dispatch } = useAppState();
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [swiper, setSwiper] = useState<Swiper>();
  const imagesLoaded = useImagePreloader(imageUrls);

  useEffect(() => {
    if (!swiper) return;

    if (swiper.activeIndex === 0) {
      setIsBeginning(true);
    }

    if (swiper.activeIndex === swiper.slides.length - 1) {
      setIsEnd(true);
    }

    console.log(swiper, "swiper");

    const handleSlideChange = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

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
    return (
      <div className={"suspense"}>
        <LoadSpinning />
      </div>
    );
  }

  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      initialSlide={state.level}
      onSwiper={(swiper) => {
        setSwiper(swiper);
      }}
      onSlideChange={(e) => {
        setCurrentSkin(e.activeIndex);
      }}
    >
      {SKINS.map((skin, index) => {
        return (
          <SwiperSlide key={index}>
            <SkinSlide
              skin={skin}
              currentPoints={state.points}
              level={state.level}
            />
          </SwiperSlide>
        );
      })}
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
    </Swiper>
  );
};

export default Slider;
