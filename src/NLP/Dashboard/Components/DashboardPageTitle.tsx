import { IHeader } from "../../Interfaces";

export const DashboardPageTitle = ({ title, showFullScreen }: IHeader) => (
    <div className="panel-heading itemTitleBar addedTitle">
        <div className="itemTitle pull-left">
            <span data-cy="title" className="refTitle">
                {title}
            </span>
        </div>

        <div className="pull-right hidden-print tools-pull-right">
            <div className="btn-group toolbarButtons">
                {showFullScreen && (
                    <div className="btn-group btn-dashboard-fullscreen">
                        <button title="" data-original-title="Fullscreen" className="btn btn-item btn-fullscreen">
                            <span className="fal fa-expand-arrows-alt"></span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
);
