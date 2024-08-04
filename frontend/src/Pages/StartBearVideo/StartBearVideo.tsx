import styles from "./StartBearVideo.module.css";
import StartVideo from "/start-video.mp4";

const StartBearVideo = ({ onEndVideoHandler }) => {
  return (
    <div className={styles["start-bear-video"]}>
      <video
        onEnded={onEndVideoHandler}
        src={StartVideo}
        autoPlay
        playsInline
        muted
      ></video>
    </div>
  );
};

export default StartBearVideo;
