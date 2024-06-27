import {
    ControlCoreBase,
    IConfigApp,
    IDashboardPage,
    IDashboardParametersBase,
    IExternalPlugin,
    IItem,
    IPluginConfig,
    IPluginFieldHandler,
    IPluginFieldValueBase,
    IPluginSettingPage,
    IProjectSettingsBase,
    IServerSettingsBase,
    ITool,
    PluginCore,
    Project,
    registerPlugin,
} from "matrix-requirements-sdk/client";

import { sdkInstance } from "./Instance";
import { DashboardPage, IDashboardParameters } from "./Dashboard/DashboardPage";

/** This class is allows you to configure the features of your plugin.
 *
 *  You can also implement functions to into the plugin (at start in the constructor, when loading a project, when loading an item)
 *
 */
export class Plugin
    implements
        IExternalPlugin<
            IServerSettingsBase,
            IProjectSettingsBase,
            IPluginFieldHandler<IPluginFieldValueBase>,
            IPluginFieldValueBase,
            IDashboardParameters
        >
{
    /**This part enables which
     *
     * See IPluginConfig interface for explanation of parameters
     */

    static config: IPluginConfig<IServerSettingsBase, IProjectSettingsBase> = {
        /*  Page in admin client to configure settings across all projects - set enabled to false if not needed.
            The page itself is implemented in the _ServerSettingsPage.ts
        */
        customerSettingsPage: {
            id: "NLPCustomerSettings",
            title: "NLP customer settings page",
            type: "NLPcs",
            enabled: false,
            defaultSettings: {
                myServerSetting: "default value for setting defined in Interfaces.ts",
                mySecondValue: "second value for setting defined in Interfaces.ts",
            },
            settingName: "NLP_settings",
            help: "This is my help text",
            helpUrl: "https://docs23.matrixreq.com",
        },
        /*  Page in admin client to configure settings for one specific project - set enabled to false if not needed.
            The page itself is implemented in the _ProjectSetingsPage.ts
        */
        projectSettingsPage: {
            id: "NLPprojectsettings",
            title: "NLP projectsettings page",
            type: "NLPps",
            enabled: false,
            defaultSettings: {
                myProjectSetting: "default value for setting defined in Interfaces.ts",
            },
            settingName: "NLP_settings",
            help: "This is my help text",
            helpUrl: "https://docs23.matrixreq.com",
        },
        /*  Add an entry in the tool menu of an item or folder - set enabled to false if not needed.
            The tool itself is implemented in the _Tool.ts
        */
        menuToolItem: {
            enabled: true,
            title: "matrix-ui-plugin-boilerplate-menuitem",
        },
        /*  Add a custom field to enter some data in the UI - set enabled to false if not needed.
            The field itself is implemented in the _Control.ts
        */
        field: {
            enabled: true,
            fieldType: "matrix-ui-plugin-boilerplate",
            title: "matrix-ui-plugin-boilerplate-field",
            fieldConfigOptions: {
                id: "matrix-ui-plugin-boilerplate",
                capabilities: {
                    canBePublished: false,
                    canBeReadonly: true,
                    canBeXtcPreset: false,
                    canHideInDoc: false,
                    canBeUsedInDocs: false,
                    canRequireContent: true,
                },
                class: "",
                help: "",
                label: "matrix-ui-plugin-boilerplate-field",
            },
        },
        /*  Add a dashboard inside a project - set enabled to false if not needed.
            The field itself is implemented in the _Control.ts
        */
        dashboard: {
            id: "NLP",
            title: "Neuroloop Dashboard Page",
            enabled: true,
            icon: "fal fa-cog",
            parent: "DASHBOARDS",
            usefilter: true,
            order: 9999,
        },
    };
    core: PluginCore;
    PLUGIN_VERSION = "1.0.0";
    PLUGIN_NAME = "Neuroloop Dashboard";
    private currentProject: Project;

    /**
     * The constructor is loaded once after all the source code is loaded by the browser.
     * Nothing is known about the instance, project, user etc.
     * You can use it to initialize things like callbacks after item changes
     */
    constructor() {
        // here is a good place to register callbacks for UI events (like displaying or saving items)
        // @ts-ignore
        this.core = new sdkInstance.PluginCore(this);
        // @ts-ignore
        this.currentProject = null;
    }

    async getDashboardAsync(): Promise<DashboardPage> {
        // Whoa, now is my chance to load from the web
        // I can do "slow" things here if necessary.
        await this.setupProject();
        // TODO: projectStorage should be available on Project.
        return new DashboardPage(this.currentProject, sdkInstance.globalMatrix.projectStorage);
    }

    async getProjectSettingsPageAsync(): Promise<IPluginSettingPage<IProjectSettingsBase>> {
        // @ts-ignore
        return null;
    }

    async getServerSettingsPageAsync(): Promise<IPluginSettingPage<IServerSettingsBase>> {
        // @ts-ignore
        return null;
    }

    async getControlAsync(
        ctrlObj: JQuery,
    ): Promise<ControlCoreBase<IPluginFieldHandler<IPluginFieldValueBase>, IPluginFieldValueBase>> {
        // @ts-ignore
        return null;
    }

    async getToolAsync(): Promise<ITool> {
        // @ts-ignore
        return null;
    }

    getConfig() {
        return Plugin.config;
    }

    enableToolMenu(ul: JQuery, _hook: number): boolean {
        return this.core.enabledInContext;
    }

    /**
     * This method is called each time  a project has been loaded and initialized.
     * At the time it is called, all project settings, categories etc are defined.
     *
     * @param project // id of the loaded project
     */
    onInitProject(project: string) {
        // here is a good place to decide based on the project (maybe some project setting), whether the plugin should be enabled

        // if not:
        // this.enabledInContext = false;
        this.setupProject(project);
    }

    /** this method is called just before the rendering of an item is done
     * It is also called when opening the create item dialog.
     *
     * @param _item: the item which is being loaded in the UI
     */
    onInitItem(item: IItem) {
        // here is a good place to decide based on the selection in the tree, whether the plugin should be enabled
        // if not:
        // this.enabledInContext = false;
    }

    private async setupProject(newProjectName?: string) {
        if (this.currentProject) {
            // Did we change projects?
            if (newProjectName && this.currentProject.getName() != newProjectName) {
                // @ts-ignore
                this.currentProject = null;
            }
        }
        if (this.currentProject == null) {
            this.currentProject = newProjectName
                ? (await sdkInstance.matrixsdk.openProject(newProjectName))!
                : (await sdkInstance.matrixsdk.openCurrentProjectFromSession())!;
        }
    }
}

registerPlugin(new Plugin().core);
