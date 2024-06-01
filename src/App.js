import { useEffect, useState } from "react";
import ModeControls from "./components/ModeControls";
import sound from "./assets/audio/finish.mp3";
import ResetTimerBtn from "./components/buttons/ResetTimerBtn";
import ControlTimerBtn from "./components/buttons/ControlTimerBtn";
import Timer from "./components/Timer";

const INITIAL_TIMERS = {
  pomodori: 1500000,
  shortBreak: 180000,
  longBreak: 900000,
};

// for quick test functionality (remove later)
// const INITIAL_TIMERS = {
//   pomodori: 3000,
//   shortBreak: 2000,
//   longBreak: 1000,
// };

const audio = new Audio(sound);

function App() {
  const [timers, setTimers] = useState(INITIAL_TIMERS);
  const [mode, setMode] = useState(Object.keys(INITIAL_TIMERS)[0]);
  const [currentTimerState, setCurrentTimerState] = useState({
    isActive: false,
    timeLeft: INITIAL_TIMERS[mode],
  });

  useEffect(() => {
    if (currentTimerState.isActive) {
      const interval = setInterval(() => {
        if (currentTimerState.timeLeft > 0) {
          setCurrentTimerState((prevState) => {
            return {
              ...prevState,
              timeLeft: prevState.timeLeft - 1000,
            };
          });
        } else {
          audio.play();
          setCurrentTimerState((prevState) => {
            return {
              ...prevState,
              isActive: false,
            };
          });
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentTimerState]);

  function handleControlTimer() {
    setCurrentTimerState((prevState) => {
      return {
        ...prevState,
        isActive: !prevState.isActive,
      };
    });
  }

  function handleResetTimer() {
    setCurrentTimerState({
      isActive: false,
      timeLeft: timers[mode],
    });
  }

  function handleModeChange(selectedMode) {
    setMode(selectedMode);

    setCurrentTimerState({
      isActive: false,
      timeLeft: timers[selectedMode],
    });
  }

  return (
    <div className="container">
      <ModeControls
        modes={Object.keys(timers)}
        currentMode={mode}
        onModeChange={handleModeChange}
      />
      <Timer currTimer={currentTimerState} timer={timers[mode]} mode={mode} />
      <div className="control-buttons">
        <ControlTimerBtn
          currTimer={currentTimerState}
          time={timers[mode]}
          onControlTimer={handleControlTimer}
        />
        <ResetTimerBtn
          currTimer={currentTimerState}
          time={timers[mode]}
          onResetTimer={handleResetTimer}
        />
      </div>
    </div>
  );
}

export default App;
