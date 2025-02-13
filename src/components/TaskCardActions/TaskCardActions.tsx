import { memo } from "react";
import stl from "./TaskCardActions.module.scss";
import { Delete } from "@ricons/carbon";
import ActionButton from "../../UI/ActionButton/ActionButton";
import { Popconfirm } from 'antd';
import { ITask } from "../../types/TTasks";
import { TChangeData } from "../../types/ChangeDataAction";
import { ChevronDown, ChevronUp } from "@ricons/carbon";
import { Information } from "@ricons/carbon";
import { t } from "../../data/inscriptions";

interface ITaskCardActions {
    dataItem: ITask;
    changeData: TChangeData;
    onOpenInfoTaskDrawer: () => void;
    index: number | string;
    isLastItemInList: boolean;
}

const tip = t.tooltip;

const TaskCardActions: React.FC<ITaskCardActions> = ({ 
    dataItem,
    changeData,
    index,
    isLastItemInList,
    onOpenInfoTaskDrawer 
}) => {

    const onDeleteTask = () => {
        changeData({
            actionType: "delete",
            id: dataItem.id,
            title: dataItem.title
        });
    };

    const moveTask = (placement: "up" | "down") => {
        changeData({
            actionType: "moveTask",
            task: dataItem, 
            placement
        })
    }

    return (
        <div className={stl.taskcard_actions}>
            <ul>
                <li className={stl.taskcard_open_info}>       
                    <ActionButton size={23} onClick={onOpenInfoTaskDrawer} tooltipText={tip.showInfo}>
                        <Information style={{transform: "translateY(1px)"}}/> {/* TODO */}
                    </ActionButton>
                </li>
                <li className={stl.taskcard_delete}>
                    <ActionButton size={23} tooltipText={tip.deleteCard}>
                        <Popconfirm
                            title={tip.deleteCard}
                            description={t.questions.deleteTaskQues}
                            placement="top"
                            onConfirm={onDeleteTask}
                        >
                            <Delete />
                        </Popconfirm>
                    </ActionButton>
                </li>
                <li className={stl.taskcard_movers}>
                    <ActionButton 
                        onClick={() => moveTask("up")}
                        size={23} 
                        tooltipText={tip.moveUp}
                        visible={index !== 0}
                    >
                        <ChevronUp />
                    </ActionButton>
                    <ActionButton 
                        size={23} 
                        onClick={() => moveTask("down")} 
                        tooltipText={tip.moveDown} 
                        tooltipPlacement="bottom"
                        visible={!isLastItemInList}
                    >
                        <ChevronDown />
                    </ActionButton>
                </li>
            </ul>
        </div>
    )
}

export default memo(TaskCardActions);
