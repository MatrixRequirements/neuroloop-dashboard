import * as ReactDOM from "react-dom";
import { IPluginSettingPage } from "matrix-requirements-sdk/client";

import { IServerSettings } from "../Interfaces";
import { Plugin } from "../Plugin";
import { ServerSettingsPageComponent } from "./ServerSettingPageComponent";
import { sdkInstance } from "./../Instance";

// eslint-disable-next-line no-unused-vars
/* server Setting page closure*/
export class ServerSettingsPage extends sdkInstance.ConfigPage implements IPluginSettingPage<IServerSettings> {
    settingsOriginal?: IServerSettings;
    settingsChanged?: IServerSettings;

    settings(): IServerSettings {
        // @ts-ignore
        return {
            ...Plugin.config.customerSettingsPage.defaultSettings,
            ...sdkInstance.PluginCore.getServerSetting(Plugin.config.customerSettingsPage.settingName, {}),
        };
    }
    /** Customize this method to generate static HTML.  */
    // @ts-ignore
    getSettingsDOM(settings: IServerSettings): JQuery {
        let container = document.createElement("div");
        container.classList.add("panel-body-v-scroll");
        container.classList.add("fillHeight");
        ReactDOM.render(
            <ServerSettingsPageComponent
                serverSettings={settings}
                settingsChanged={(settings) => {
                    this.settingsChangedHandler(settings);
                }}
            />,
            container,
        );
        return $(container);
    }
    /** Customize this method to add dynamic content*/
    showSimple() {
        $("#container", sdkInstance.app.itemForm).empty();
        // @ts-ignore
        let dom = this.getSettingsDOM(this.settingsChanged);
        $("#container", sdkInstance.app.itemForm).append(dom);
    }
    settingsChangedHandler(settings: IServerSettings) {
        this.settingsChanged = settings;
        this.paramChanged();
    }
    renderSettingPage() {
        this.initPage(
            `${Plugin.config.customerSettingsPage.title} - Server settings`,
            true,
            // @ts-ignore
            undefined,
            Plugin.config.customerSettingsPage.help,
            Plugin.config.customerSettingsPage.helpUrl,
            undefined,
        );
        this.settingsOriginal = { ...this.settings() };
        this.settingsChanged = { ...this.settingsOriginal };
        sdkInstance.app.itemForm.append($("<div id='container'></div>"));
        this.showSimple();
    }
    showAdvanced() {
        console.debug("Show advanced clicked");
        this.showAdvancedCode(JSON.stringify(this.settingsChanged), (newCode: string) => {
            this.settingsChanged = JSON.parse(newCode);
            this.paramChanged();
            this.showSimple();
        });
    }
    saveAsync() {
        let def = this.configApp.setServerSettingAsync(
            Plugin.config.customerSettingsPage.settingName,
            JSON.stringify(this.settingsChanged),
        );
        def.done(() => {
            // @ts-ignore
            this.settingsOriginal = { ...this.settingsChanged };
            this.renderSettingPage();
        });
        return def;
    }

    paramChanged() {
        this.configApp.itemChanged(JSON.stringify(this.settingsOriginal) != JSON.stringify(this.settingsChanged));
    }
}
