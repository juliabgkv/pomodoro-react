import { useEffect, useState } from 'react';
import { msToTime, timeStringify } from './utils/timeConverter';
import ModeControls from './components/ModeControls';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

const INITIAL_TIMERS = {
  pomodori: 1500000,
  shortBreak: 180000,
  longBreak: 900000
};

// for quick test functionality (remove later)
// const INITIAL_TIMERS = {
//   pomodori: 3000,
//   shortBreak: 2000,
//   longBreak: 1000
// };

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

  const progress = (currentTimerState.timeLeft/timers[mode])*100;
  let content;
  let btnTitle = 'Start';

  if (currentTimerState.isActive) btnTitle = 'Pause';
  else if (currentTimerState.timeLeft < timers[mode] && !currentTimerState.isActive) btnTitle = 'Resume';

  if (currentTimerState.timeLeft > 0) {
    const time = msToTime(currentTimerState.timeLeft);
    const timeStr = timeStringify(time);

    content = <>
                <div className='time'>{timeStr}</div>
              </>;
  } else if (currentTimerState.timeLeft === 0 && (mode === 'shortBreak' || mode === 'longBreak')) {
    content = <p>Time to back to work!</p>;
  } else if (currentTimerState.timeLeft === 0 && mode === 'pomodori') {
    content = <p>Take a break!</p>
  }

  let resetBtnClasses = 'reset-timer-btn';

  if (currentTimerState.timeLeft < timers[mode]) resetBtnClasses += ' active';

  return (
    <div className="container">
      <ModeControls
        modes={Object.keys(timers)}
        currentMode={mode}
        onModeChange={handleModeChange}
      />
      <div className="progress-bar-container">
        <CircularProgressbarWithChildren
          value={progress}
          strokeWidth={3}
          styles={buildStyles({
            strokeLinecap: 'round',
            pathTransitionDuration: 0.5,
            pathColor: `rgba(250, 249, 246)`,
            // textColor: '#f88',
            trailColor: '#8B0000',
            // backgroundColor: '#3e98c7',
          })}
        >
        {content}
        </CircularProgressbarWithChildren>
      </div>
      <div className='control-buttons'>
        {currentTimerState.timeLeft !== 0 &&
          <button
            title={btnTitle}
            onClick={handleControlTimer}
            className={'control-timer-btn ' + (currentTimerState.isActive ? 'pause' : 'start')}
          >
          </button>
        }
        <button
          title='Reset'
          onClick={handleResetTimer}
          className={resetBtnClasses}
        >
        </button>
      </div>
    </div>
  );
}

export default App;