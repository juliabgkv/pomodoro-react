import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { msToTimeString } from "../utils/timeConverter";

function Timer({ currTimer, timer, mode }) {
  const progress = (currTimer.timeLeft / timer) * 100;
  let content;

  if (currTimer.timeLeft > 0) {
    const timeStr = msToTimeString(currTimer.timeLeft);

    content = <div className="time">{timeStr}</div>;
  } else if (
    currTimer.timeLeft === 0 &&
    (mode === "shortBreak" || mode === "longBreak")
  ) {
    content = <p className="message">Time to go back to work!</p>;
  } else if (currTimer.timeLeft === 0 && mode === "pomodori") {
    content = <p className="message">Take a break!</p>;
  }

  return (
    <div className="progress-bar-container">
      <CircularProgressbarWithChildren
        value={progress}
        strokeWidth={3}
        styles={buildStyles({
          strokeLinecap: "round",
          pathTransitionDuration: 0.5,
          pathColor: `rgba(250, 249, 246)`,
          trailColor: "#8B0000",
        })}
      >
        {content}
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default Timer;
