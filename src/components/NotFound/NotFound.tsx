import { useMemo, memo } from "react";
import { TTypeCompletedTask } from "../../types/ChangeDataAction";
import stl from "./NotFound.module.scss";

interface INotFound {
    typeTab: TTypeCompletedTask;
    textSearch: string;
}

const NotFound: React.FC<INotFound> = ({ typeTab, textSearch }) => {

    const getDescription = useMemo(() => {
        const varTypesTasks = {
            all: "Any",
            active: "Active",
            completed: "Completed",
        };
        return `${varTypesTasks[typeTab.toLowerCase() as keyof typeof varTypesTasks]} tasks were not found`;
        
    }, [typeTab, textSearch]);

    return (
        <div className={stl.not_found}>
            <div className={stl.not_found_conteiner}>
                <h2>
                    {getDescription}
                </h2>
            </div>
        </div>
    )
}

export default memo(NotFound);
