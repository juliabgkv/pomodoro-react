function ControlTimerBtn({ currTimer, timer, onControlTimer }) {
  let controlBtnClasses =
    "control-timer-btn " + (currTimer.isActive ? "pause" : "start");

  if (currTimer.timeLeft !== 0) controlBtnClasses += " active";

  let btnTitle = "Start";

  if (currTimer.isActive) btnTitle = "Pause";
  else if (currTimer.timeLeft < timer && !currTimer.isActive)
    btnTitle = "Resume";

  return (
    <button
      title={btnTitle}
      onClick={onControlTimer}
      className={controlBtnClasses}
    ></button>
  );
}

export default ControlTimerBtn;
