import styles from "./StartBearVideo.module.css";
import StartVideo from "/start-video.mp4";
import { useEffect, useRef, useState } from "react";
import { current } from "@reduxjs/toolkit";

const StartBearVideo = ({ onEndVideoHandler }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      // setTimeout(() => {
      //   videoRef?.current.muted = false; // Включение звука
      //   videoRef?.current.play();
      //   console.log("work");
      // }, 100);
    }
  }, []);

  return (
    <div className={styles["start-bear-video"]}>
      <button
        onClick={() => {
          setMuted((current) => !current);
          console.log(muted, "muted");
        }}
        className={styles["unmute"]}
      >
        Unmute
      </button>
      <video
        ref={videoRef}
        onEnded={onEndVideoHandler}
        src={StartVideo}
        autoPlay
        // playsInline
        muted={muted}
      ></video>
    </div>
  );
};

export default StartBearVideo;
