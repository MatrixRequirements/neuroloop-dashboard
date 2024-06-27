import { ChangeEvent, useState } from "react";
import { IProjectSettingsProp } from "../Interfaces";

interface ProjectSettingsState {
    myProjectSetting: string;
    // Include other settings here as needed
}

export const ProjectSettingsPageComponent = ({ projectSettings, settingsChanged }: IProjectSettingsProp) => {
    const [state, setState] = useState<ProjectSettingsState>(projectSettings);

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
                <label>My Project Setting</label>
                <input
                    autoComplete="off"
                    value={state.myProjectSetting}
                    name="myProjectSetting"
                    className="lineInput form-control"
                    onChange={handleChange}
                />
            </span>
        </div>
    );
};
