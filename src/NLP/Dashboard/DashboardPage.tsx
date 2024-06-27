import * as ReactDOM from "react-dom";

import { Plugin } from "../Plugin";
import { DashboardPageContainer } from "./Components/DashboardPageContainer";
import { DashboardProps, DashboardState, IDashboard, IDashboardContent, IProjectSettings } from "../Interfaces";
import { Project, IDataStorage, IItem, IDashboardPage, IDashboardParametersBase } from "matrix-requirements-sdk/client";
import { sdkInstance } from "./../Instance";

export interface IDashboardParameters extends IDashboardParametersBase {}

export const Dashboard = (props: IDashboardContent) => <div className="itemDetails">Hello from Dashboard!</div>;

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
    renderProjectPage() {
        const element = document.createElement("div");
        let dashboard: IDashboard = {
            header: { title: "Dashboard", showFullScreen: false },
            dashboardContent: { settings: this.settings },
        };
        ReactDOM.render(<DashboardPageContainer dashboard={dashboard} />, element);
        sdkInstance.app.itemForm.append(element);
    }

    onResize() {
        /* Will be triggered when resizing. */
    }
}
