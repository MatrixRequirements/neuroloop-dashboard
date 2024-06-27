import { IProjectSettingsBase } from "matrix-requirements-sdk/client";

/* Setting interfaces */
/**
 * This file defines all the data structures which might be shared between UI components and printing
 *
 */

export interface IProjectSettingsProp {
    projectSettings: IProjectSettings;
    settingsChanged: (projectSettings: IProjectSettings) => void;
}

/** Project setting for plugin
 *
 * This you can use to save setting for one specific project.
 * The user can edit these in the admin through the Project Setting Page
 */
export interface IProjectSettings extends IProjectSettingsBase {
    /** example of a project setting */
    myProjectSetting: string;
}

export interface IHeader {
    title: string;
    showFullScreen: boolean;
}

export interface IDashboardContent {
    settings: IProjectSettings;
}

export interface IDashboard {
    header: IHeader;
    dashboardContent: IDashboardContent;
}

export type DashboardProps = {
    dashboard: IDashboard;
};
export type DashboardState = {
    /* Nothing for the moment */
};
