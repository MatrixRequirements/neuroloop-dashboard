import * as ReactDOM from "react-dom";

import { Plugin } from "../Plugin";
import { IDashboardContent, IProjectSettings } from "../Interfaces";
import { Project, IDataStorage, IItem, IDashboardPage, IDashboardParametersBase } from "matrix-requirements-sdk/client";
import { sdkInstance } from "./../Instance";

export interface IDashboardParameters extends IDashboardParametersBase {}

// Glue code to support the IDashboardPage interface
// eslint-disable-next-line no-unused-vars
export class DashboardPage implements IDashboardPage<IDashboardParameters> {
    settings: IProjectSettings;

    constructor(
        private project: Project,
        private projectStorage: IDataStorage,
        private popupModeOrControl = false,
        // @ts-ignore
        private currentFolder: IItem = undefined,
    ) {
        // @ts-ignore
        this.settings = {
            ...Plugin.config.projectSettingsPage.defaultSettings,
            ...project.getItemConfig().getSettingJSON(Plugin.config.projectSettingsPage.settingName, {}),
        };
    }

    /** Add interactive element in this function */
    async renderProjectPage() {
        const element = document.createElement("div");
        const html = "<h1>Neuoloop Dashboard Page</h1>\n" + "<p>Here is our dashboard</p>";
        element.innerHTML = html;
        const projects = await sdkInstance.matrixsdk.getProjects();
        // append the project list.
        element.innerHTML += "<p>Here is a list of all projects on the server:</p><ul>";
        for (let p of projects) {
            element.innerHTML += `<li>${p}</li>`;
        }
        element.innerHTML += "</ul>";
        sdkInstance.app.itemForm.append(element);
    }

    onResize() {
        /* Will be triggered when resizing. */
    }
}
