import styles from "./StartBearVideo.module.css";
import StartVideo from "/start-video.mp4";
import { useEffect, useRef, useState } from "react";
import TurnOnSoundIcon from "../../icons/turn-on-sound.svg";
import TurnOffSoundIcon from "../../icons/turn-off-sound.svg";

const StartBearVideo = ({ setUserIsRegistered, setVideoIsEnd }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, [videoRef.current]);

  return (
    <>
      <div className={styles["start-bear-video"]}>
        <button
          onClick={() => {
            setMuted((current) => !current);
          }}
          className={styles["mute-button"]}
        >
          <img src={muted ? TurnOffSoundIcon : TurnOnSoundIcon} alt={""} />
        </button>
        <video
          ref={videoRef}
          onEnded={() => {
            setTimeout(() => {
              setVideoIsEnd(true);
              setUserIsRegistered(true);
            }, 100);
          }}
          src={StartVideo}
          autoPlay
          // playsInline
          muted={muted}
        ></video>
      </div>
    </>
  );
};

export default StartBearVideo;
