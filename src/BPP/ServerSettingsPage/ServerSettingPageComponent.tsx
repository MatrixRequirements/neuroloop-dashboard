import { useState, ChangeEvent } from "react";

import { IServerSettingsProp } from "../Interfaces";

interface ServerSettingsState {
    myServerSetting: string;
    mySecondValue: string;
    // Include other settings here as needed
}

export const ServerSettingsPageComponent = ({ serverSettings, settingsChanged }: IServerSettingsProp) => {
    const [state, setState] = useState<ServerSettingsState>(serverSettings);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const updatedSettings = {
            ...state,
            [evt.target.name]: evt.target.value,
        };
        setState(updatedSettings);
        settingsChanged?.(updatedSettings);
    };

    return (
        <div>
            <span>
                <label>My Server Setting</label>
                <input
                    autoComplete="off"
                    value={state.myServerSetting}
                    name="myServerSetting"
                    className="lineInput form-control"
                    onChange={handleChange}
                />
            </span>
            <span>
                <label>My Second Value</label>
                <input
                    autoComplete="off"
                    value={state.mySecondValue}
                    name="mySecondValue"
                    className="lineInput form-control"
                    onChange={handleChange}
                />
            </span>
        </div>
    );
};
