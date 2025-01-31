import { useState } from "react";
import stl from "./TaskCardActions.module.scss";
import { Delete, Unlocked, ChevronSortUp, ChevronSortDown, OpenPanelRight } from "@ricons/carbon";
import ActionButton from "../../UI/ActionButton/ActionButton";
import { ITask } from "../../types/TTasks";
import { t } from "../../data/inscriptions";

interface ITaskCardActions {
    dataItem: ITask;
    changeData: (actionType: string, id: number, title: string) => void;
    onOpenInfoTaskDrawer: () => void;
}

const tip = t.tooltip;

const TaskCardActions: React.FC<ITaskCardActions> = ({ dataItem, changeData, onOpenInfoTaskDrawer }) => {
    const [stepDeletion, setStepDeletion] = useState<number>(0);

    const onDeleteTask = () => {
        if (stepDeletion > 2) return;

        setStepDeletion(stepDeletion + 1);
        if (stepDeletion === 2) {
            changeData("delete", 1, dataItem.title);
        }
    };

    return (
        <div className={stl.taskcard_actions}>
            <ul>
                <li className={stl.taskcard_movers}>
                    <ActionButton size={32} onClick={() => {}} tooltipText={tip.moveUp}>
                        <ChevronSortUp />
                    </ActionButton>
                    <ActionButton size={32} 
                        onClick={() => {}} 
                        tooltipText={tip.moveDown} 
                        tooltipPlacement="bottom"
                    >
                        <ChevronSortDown />
                    </ActionButton>
                </li>
                <li className={stl.taskcard_delete} onClick={onDeleteTask}>
                    {
                        stepDeletion === 0 ? 
                            <ActionButton size={22} onClick={() => {}} tooltipText={tip.deleteCard}>
                                <Delete />
                            </ActionButton> :
                            (
                                stepDeletion === 2 ? 
                                <ActionButton size={22} color={"red"} onClick={() => {}}>
                                    <Delete />
                                </ActionButton>
                                : 
                                <ActionButton size={22} onClick={() => {}}>
                                    <Unlocked />
                                </ActionButton>
                            )
                    }
                </li>
                <li className={stl.taskcard_open_info}>       
                    <ActionButton size={22} onClick={onOpenInfoTaskDrawer} tooltipText={tip.showInfo}>
                        <OpenPanelRight />
                    </ActionButton>
                </li>
            </ul>
        </div>
    )
}

export default TaskCardActions;
