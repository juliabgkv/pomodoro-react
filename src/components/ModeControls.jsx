import { idToLabel } from '../utils/idToLabel';

function ModeControls({ modes, currentMode, onModeChange }) {
    function handleOnChange(e) {
        onModeChange(e.target.value);
    }

    return (
        <form>
            {modes.map(mode => {
                const label = idToLabel(mode);

                return (
                    <div key={mode}>
                        <input
                            type="radio"
                            id={mode}
                            value={mode}
                            checked={mode === currentMode}
                            onChange={handleOnChange}
                        ></input>
                        <label htmlFor={mode}>{label}</label>
                    </div>
                );
            })}
        </form>
    );
}

export default ModeControls;