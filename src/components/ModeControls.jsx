import { idToLabel } from "../utils/idToLabel";

function ModeControls({ modes, currentMode, onModeChange }) {
  function handleOnChange(e) {
    onModeChange(e.target.value);
  }

  return (
    <form className="mode-controls-form">
      {modes.map((mode) => {
        const label = idToLabel(mode);

        return (
          <label htmlFor={`${mode}Mode`} key={mode} className="mode-control-label">
            <input
              type="radio"
              id={`${mode}Mode`}
              value={mode}
              checked={mode === currentMode}
              onChange={handleOnChange}
            ></input>
            {label}
          </label>
        );
      })}
    </form>
  );
}

export default ModeControls;
