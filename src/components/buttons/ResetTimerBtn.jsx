function ResetTimerBtn({ currTimer, time, onResetTimer }) {
  let resetBtnClasses = "reset-timer-btn";
  if (currTimer.timeLeft < time) resetBtnClasses += " active";

  return (
    <button
      title="Reset"
      onClick={onResetTimer}
      className={resetBtnClasses}
    ></button>
  );
}

export default ResetTimerBtn;
