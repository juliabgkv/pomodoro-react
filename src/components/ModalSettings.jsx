import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  convertMinutesTimerToMs,
  convertMsTimersToMinutes,
} from "../utils/timeConverter";

const ModalSettings = forwardRef(function ModalSettings(
  { timers, onChangeSettings },
  ref
) {
  const dialog = useRef();
  const [minutesTimers, setTimers] = useState(convertMsTimersToMinutes(timers));

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  function handleOnClose() {
    dialog.current.close();
  }

  function handleInputChange(e) {
    setTimers((prevTimers) => {
      return {
        ...prevTimers,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleSaveChanges() {
    const msTimers = convertMinutesTimerToMs(minutesTimers);
    onChangeSettings(msTimers);
  }

  return createPortal(
    <dialog ref={dialog} className="dialog">
      <header className="dialog-header">
        <h3>Settings</h3>
        <button onClick={handleOnClose} className="close-dialog-btn"></button>
      </header>
      <form method="dialog" onSubmit={handleSaveChanges}>
        <div className="inputs-container">
          <div className="dialog_input">
            <label htmlFor="pomodori">Pomodori:</label>
            <input
              value={minutesTimers.pomodori}
              type="number"
              max="90"
              min="15"
              required
              id="pomodori"
              onChange={handleInputChange}
            />
          </div>
          <div className="dialog_input">
            <label htmlFor="shortBreak">Short Break:</label>
            <input
              value={minutesTimers.shortBreak}
              type="number"
              max="15"
              min="3"
              required
              id="shortBreak"
              onChange={handleInputChange}
            />
          </div>
          <div className="dialog_input">
            <label htmlFor="longBreak">Long Break:</label>
            <input
              value={minutesTimers.longBreak}
              type="number"
              max="40"
              min="15"
              required
              id="longBreak"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button className="save-btn">Save</button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default ModalSettings;
