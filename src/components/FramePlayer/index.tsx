import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const INTERVAL_IN_MILISECONDS = 10;

export function FramePlayer() {
  const [currentTimeInMiliseconds, setCurrentTimeInMiliseconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        setCurrentTimeInMiliseconds((value) => value + INTERVAL_IN_MILISECONDS);
      }
    }, INTERVAL_IN_MILISECONDS);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className={styles.framePlayer}>
      <div>{currentTimeInMiliseconds.toString()}</div>
      <div></div>
      <div>
        <button onClick={() => setIsPlaying((value) => !value)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
