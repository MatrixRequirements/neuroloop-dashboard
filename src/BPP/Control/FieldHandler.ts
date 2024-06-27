import { IPluginConfig, IPluginFieldHandler } from "matrix-requirements-sdk/client";

import { Plugin } from "../Plugin";
import { IPluginFieldValue, IProjectSettings, IServerSettings } from "../Interfaces";

export class FieldHandler implements IPluginFieldHandler<IPluginFieldValue> {
    // @ts-ignore
    private data: IPluginFieldValue;

    constructor(
        private fieldType: string,
        private config: IPluginConfig<IServerSettings, IProjectSettings>,
    ) {}

    getData() {
        return JSON.stringify(this.data);
    }

    setData(data: string) {
        this.data = JSON.parse(data);
    }

    async getValueAsync() {
        return this.data;
    }

    getFieldType(): string {
        return Plugin.config.field.fieldType;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initData(serializedFieldData: string): any {
        try {
            this.data = JSON.parse(serializedFieldData);
        } catch (e) {
            console.warn(`Failed to parse data for field  ${this.getFieldType()} with data ${serializedFieldData}`);
        }
        if (!this.data) {
            this.data = { value: "", html: "" };
        }
    }

    setValue(data: IPluginFieldValue) {
        this.data = data;
    }
}
