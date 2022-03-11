import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  frames: string[];
  fps: number;
};

const INTERVAL_IN_MILISECONDS = 10;

export function FramePlayer({ frames, fps }: Props) {
  const [currentTimeInMiliseconds, setCurrentTimeInMiliseconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalTimeInMiliseconds = (1000 * frames.length) / fps;

  const isOnEndOfFrames = currentTimeInMiliseconds >= totalTimeInMiliseconds;

  const currentFrame = Math.floor((fps * currentTimeInMiliseconds) / 1000);

  /* using separate useEffects for the time increments and autostop because 
  a big delay happens when the "setInterval" needs to be called on every tick. */

  // time increments
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        setCurrentTimeInMiliseconds((value) => value + INTERVAL_IN_MILISECONDS);
      }
    }, INTERVAL_IN_MILISECONDS);
    return () => clearInterval(intervalId);
  }, [isPlaying]);

  // autostop functionality
  useEffect(() => {
    if (isOnEndOfFrames && isPlaying) {
      setIsPlaying(false);
      setCurrentTimeInMiliseconds(totalTimeInMiliseconds);
    }
  }, [isOnEndOfFrames, isPlaying, totalTimeInMiliseconds]);

  return (
    <div>
      <p>*Player size: 720x480</p>
      <p>*Object-fit: contain</p>
      <img
        src={frames[currentFrame] ?? frames.at(-1)}
        alt="current frame"
        className={styles.frame}
      />
      <div>
        <input
          type="range"
          min="0"
          max={frames.length}
          value={currentFrame}
          onChange={(evt) =>
            setCurrentTimeInMiliseconds(
              (1000 * parseInt(evt.currentTarget.value)) / fps
            )
          }
        />
      </div>
      <div>miliseconds: {currentTimeInMiliseconds.toString()}</div>
      <div>
        <button onClick={() => setIsPlaying((value) => !value)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
