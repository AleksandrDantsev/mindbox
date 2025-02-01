import { useMemo, memo } from "react";
import { TTypeCompletedTask } from "../../types/ChangeDataAction";
import stl from "./NotFound.module.scss";

interface INotFound {
    typeInput: "search" | "add";
    typeTab: TTypeCompletedTask;
    textSearch: string;
}

const NotFound: React.FC<INotFound> = ({ typeInput, typeTab, textSearch }) => {

    const getDescription = useMemo(() => {
        if (typeInput === "search") {
            if (textSearch.length === 0) {
                return "Try to find something";
            }
            return `No tasks with name "${textSearch}" were found`;
        }
        else {
            const varTypesTasks = {
                all: "Any",
                active: "Active",
                completed: "Completed",
            };
            return `${varTypesTasks[typeTab.toLowerCase() as keyof typeof varTypesTasks]} tasks were not found`;
        }
    }, [typeInput, typeTab, textSearch]);

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
