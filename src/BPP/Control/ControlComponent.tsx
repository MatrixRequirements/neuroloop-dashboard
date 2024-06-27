/**
 * This implements a field which can be added to a category to be displayed when editing an item.
 *
 * These fields can be printed in using the custom print sections.
 *
 */
import { useState, ChangeEvent } from "react";
import { IPluginFieldValue } from "../Interfaces";

export interface IControlProp {
    print: boolean;
    valueChanged: (data: IPluginFieldValue) => void;
    value: IPluginFieldValue;
}

export const ControlComponent = ({ print, valueChanged, value }: IControlProp) => {
    const [currentValue, setCurrentValue] = useState<IPluginFieldValue>(value);

    const handleChange = (val: string) => {
        const newValue: IPluginFieldValue = { value: val, html: "" };
        setCurrentValue(newValue);
        valueChanged(newValue);
    };

    return print ? (
        <div>{currentValue?.value}</div>
    ) : (
        <div>
            <span>
                <input
                    autoComplete="off"
                    className="lineInput form-control"
                    value={currentValue?.value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
                />
            </span>
        </div>
    );
};
