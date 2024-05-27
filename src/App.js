import { useEffect, useState } from 'react';
import { msToTime, timeStringify } from './utils/timeConverter';
import './App.css';
import ModeControls from './components/ModeControls';

const T = 2000;

// const INITIAL_TIMERS = {
//   pomodori: 1500000,
//   shortBreak: 180000,
//   longBreak: 900000
// };

// for quick test functionality (remove later)
const INITIAL_TIMERS = {
  pomodori: 3000,
  shortBreak: 2000,
  longBreak: 1000
};

function App() {
  const [timers, setTimers] = useState(INITIAL_TIMERS);
  const [mode, setMode] = useState(Object.keys(INITIAL_TIMERS)[0]);

  const [currentTimerState, setCurrentTimerState] = useState({
    isActive: false,
    timeLeft: INITIAL_TIMERS[mode]
  });

  useEffect(() => {
    if(currentTimerState.isActive) {
      const interval = setInterval(() => {
        if (currentTimerState.timeLeft > 0) {
          setCurrentTimerState(prevState => {
            return {
              ...prevState,
              timeLeft: prevState.timeLeft - 1000
            };
          });
        } else {
          setCurrentTimerState(prevState => {
            return {
              ...prevState,
              isActive: false
            };
          });
        }
      }, 1000);
  
      return () => {
        clearInterval(interval);
      }
    }
  }, [currentTimerState]);
  
  function handleControlTimer() {
    setCurrentTimerState(prevState => {
      return {
        ...prevState,
        isActive: !prevState.isActive
      };
    });
  }
  
  function handleResetTimer() {
    setCurrentTimerState(prevState => {
      return {
        isActive: false,
        timeLeft: timers[mode]
      };
    });
  }
  
  function handleModeChange(selectedMode) {
    setMode(selectedMode);

    setCurrentTimerState(prevState => {
      return {
        isActive: false,
        timeLeft: timers[selectedMode]
      };
    });
  }

  let content;

  if (currentTimerState.timeLeft > 0) {
    const time = msToTime(currentTimerState.timeLeft);
    const timeStr = timeStringify(time);
  
    let btnText = 'Start';
    if (currentTimerState.isActive) btnText = 'Pause';
    else if (currentTimerState.timeLeft < timers[mode] && !currentTimerState.isActive) btnText = 'Resume';

    content = <div>
                <div>{timeStr}</div>
                  <button onClick={handleControlTimer}>
                    {btnText}
                  </button>
              </div>;
  } else if (currentTimerState.timeLeft === 0 && (mode === 'shortBreak' || mode === 'longBreak')) {
    content = <p>Time to back to work!</p>;
  } else if (currentTimerState.timeLeft === 0 && mode === 'pomodori') {
    content = <p>Take a break!</p>
  }

  return (
    <>
      <ModeControls
        modes={Object.keys(timers)}
        currentMode={mode}
        onModeChange={handleModeChange}
      />
      {content}
      <button onClick={handleResetTimer}>Reset</button>
    </>
  );
}

export default App;