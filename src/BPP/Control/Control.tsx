import * as ReactDOM from "react-dom";
import { IPluginFieldHandler } from "matrix-requirements-sdk/client";

import { IPluginFieldOptions, IPluginFieldParameter, IPluginFieldValue, IPluginPrintParams } from "../Interfaces";
import { ControlComponent } from "./ControlComponent";
import { sdkInstance } from "./../Instance";

export class Control extends sdkInstance.ControlCore<
    IPluginFieldOptions,
    IPluginFieldHandler<IPluginFieldValue>,
    IPluginFieldValue
> {
    /** default configuration of control */
    protected controlConfig: IPluginFieldParameter = {
        options: {},
    };

    /** method to call to initialize the editor, e.g. to attach handlers to checkboxes etc */
    initEditor() {
        let that = this;
    }

    /** this method is called by the UI to retrieve the string to be saved in the database */
    getValue() {
        return this.fieldHandler.getData();
    }

    /** interactive radio control */
    protected renderEditor(fieldId: string, value: IPluginFieldValue, options: IPluginFieldOptions) {
        this.fieldHandler.setValue(value);
        let container = document.createElement("div");
        ReactDOM.render(
            <ControlComponent
                print={false}
                valueChanged={(data) => {
                    this.handleValueChange(data);
                }}
                value={value}
            />,
            container,
        );
        return $(container);
    }

    /**  readonly printing for custom section, tooltip, zen or user without right to edit */
    protected renderPrint(
        fieldId: string,
        value: IPluginFieldValue,
        options: IPluginFieldOptions,
        params: IPluginPrintParams,
    ) {
        this.fieldHandler.setValue(value);
        let container = document.createElement("div");
        ReactDOM.render(<ControlComponent print={true} value={value} valueChanged={(data) => {}} />, container);
        return $(container);
    }

    /** this method compares the to value of the control to another previous value */
    protected isSame(a: IPluginFieldValue, b: IPluginFieldValue) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    private handleValueChange(data: IPluginFieldValue) {
        this.fieldHandler.setValue(data);
        this.hasChangedAsync();
        if (this && this.settings && this.settings.valueChanged) {
            // Call hook to notify the form that the value has changed.
            this.settings.valueChanged();
        }
    }
}
