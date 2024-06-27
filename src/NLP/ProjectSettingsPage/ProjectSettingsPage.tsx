import * as ReactDOM from "react-dom";
import { IPluginSettingPage } from "matrix-requirements-sdk/client";

import { IProjectSettings, IServerSettings } from "../Interfaces";
import { Plugin } from "../Plugin";
import { ProjectSettingsPageComponent } from "./ProjectSettingsPageComponent";
import { sdkInstance } from "./../Instance";

/* project Setting page closure*/
export class ProjectSettingsPage extends sdkInstance.ConfigPage implements IPluginSettingPage<IProjectSettings> {
    // @ts-ignore
    settingsOriginal: IProjectSettings;
    // @ts-ignore
    settingsChanged: IProjectSettings;

    // @ts-ignore
    getSettingsDOM(settings: IProjectSettings): JQuery {
        let container = document.createElement("div");
        container.classList.add("panel-body-v-scroll");
        container.classList.add("fillHeight");
        ReactDOM.render(
            <ProjectSettingsPageComponent
                projectSettings={settings}
                settingsChanged={(settings) => {
                    this.settingsChangedHandler(settings);
                }}
            />,
            container,
        );
        return $(container);
    }

    settingsChangedHandler(settings: IProjectSettings) {
        this.settingsChanged = settings;
        this.paramChanged();
    }
    settings(): IProjectSettings {
        let currentSettings = {};
        if (this.configApp != undefined && this.configApp.getJSONProjectSettings != undefined) {
            let filterSettings = this.configApp.getJSONProjectSettings(
                this.getProject(),
                Plugin.config.projectSettingsPage.settingName,
            );
            if (filterSettings.length == 1) currentSettings = filterSettings[0].value;
        } else {
            currentSettings = sdkInstance.globalMatrix.ItemConfig.getSettingJSON(
                Plugin.config.projectSettingsPage.settingName,
                {},
            );
        }
        console.log("Returning project settings");
        // @ts-ignore
        return { ...Plugin.config.projectSettingsPage.defaultSettings, ...currentSettings };
    }

    renderSettingPage() {
        this.initPage(
            `${Plugin.config.projectSettingsPage.title}`,
            true,
            // @ts-ignore
            undefined,
            Plugin.config.projectSettingsPage.help,
            Plugin.config.projectSettingsPage.helpUrl,
            undefined,
        );

        this.settingsOriginal = this.settings();
        this.settingsChanged = { ...this.settingsOriginal };
        sdkInstance.app.itemForm.append($("<div id='container'></div>"));
        this.showSimple();
    }

    saveAsync() {
        let def = this.configApp.setProjectSettingAsync(
            this.getProject(),
            Plugin.config.projectSettingsPage.settingName,
            JSON.stringify(this.settingsChanged),
            this.configApp.getCurrentItemId(),
        );
        def.done(() => {
            this.settingsOriginal = { ...this.settingsChanged };
            this.renderSettingPage();
        });
        return def;
    }

    getProject() {
        /* get the project id from the setting page */
        return this.configApp.getCurrentItemId().split("-")[0];
    }

    showAdvanced() {
        console.debug("Show advanced clicked");
        this.showAdvancedCode(JSON.stringify(this.settingsChanged), (newCode: string) => {
            this.settingsChanged = JSON.parse(newCode);
            this.paramChanged();
            this.showSimple();
        });
    }

    showSimple() {
        $("#container", sdkInstance.app.itemForm).empty();
        let dom = this.getSettingsDOM(this.settingsChanged);
        $("#container", sdkInstance.app.itemForm).append(dom);
    }

    paramChanged() {
        this.configApp.itemChanged(JSON.stringify(this.settingsOriginal) != JSON.stringify(this.settingsChanged));
    }
}
