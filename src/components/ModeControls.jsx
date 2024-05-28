import { idToLabel } from '../utils/idToLabel';

function ModeControls({ modes, currentMode, onModeChange }) {
    function handleOnChange(e) {
        onModeChange(e.target.value);
    }

    return (
        <form className="mode-controls-form">
            {modes.map(mode => {
                const label = idToLabel(mode);

                return (
                    // <div key={mode} className="mode-control">
                        
                        <label htmlFor={mode} key={mode} className="mode-control">
                            <input
                                type="radio"
                                id={mode}
                                value={mode}
                                checked={mode === currentMode}
                                onChange={handleOnChange}
                            ></input>
                            {label}
                        </label>
                    // </div>
                );
            })}
        </form>
    );
}

export default ModeControls;