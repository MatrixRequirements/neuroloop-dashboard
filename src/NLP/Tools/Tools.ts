// eslint-disable-next-line no-unused-vars
import { ITool } from "matrix-requirements-sdk/client";

import { Plugin } from "../Plugin";

export class Tool implements ITool {
    /** callback to show or hide the menu for a selected item or folder
     *
     * */
    showMenu(itemId: string) {
        return true;
    }

    /** callback when user executes the custom the menu entry added to items or folders
     *
     * */
    menuClicked(itemId: string) {
        /* Insert code here */
        alert(Plugin.config.menuToolItem.title);
    }
}
