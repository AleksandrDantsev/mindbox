import { memo } from "react";
import stl from "./TaskCardActions.module.scss";
import { Delete, ChevronSortUp, ChevronSortDown, OpenPanelRight } from "@ricons/carbon";
import ActionButton from "../../UI/ActionButton/ActionButton";
import { Popconfirm, message } from 'antd';
import { ITask } from "../../types/TTasks";
import { TChangeData } from "../../types/ChangeDataAction";
import { t } from "../../data/inscriptions";

interface ITaskCardActions {
    dataItem: ITask;
    changeData: TChangeData;
    onOpenInfoTaskDrawer: () => void;
}

const tip = t.tooltip;

const TaskCardActions: React.FC<ITaskCardActions> = ({ dataItem, changeData, onOpenInfoTaskDrawer }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const successDelete = () => {
        messageApi.open({
          type: 'success',
          content: t.messages.successfullyDeleted,
        });
    };

    const onDeleteTask = () => {
        changeData({actionType: "delete", id: dataItem.id, title: dataItem.title});
    };

    return (
        <div className={stl.taskcard_actions}>
            {contextHolder}
            <ul>
                {/* <li className={stl.taskcard_movers}>
                    <ActionButton size={32} tooltipText={tip.moveUp}>
                        <ChevronSortUp />
                    </ActionButton>
                    <ActionButton size={32} 
                        onClick={() => {}} 
                        tooltipText={tip.moveDown} 
                        tooltipPlacement="bottom"
                    >
                        <ChevronSortDown />
                    </ActionButton>
                </li> */}
                <li className={stl.taskcard_delete}>
                    <ActionButton size={20} tooltipText={tip.deleteCard}>
                        <Popconfirm
                            title={tip.deleteCard}
                            description={t.questions.deleteTaskQues}
                            placement="top"
                            onConfirm={() => {onDeleteTask(); successDelete()}}
                            >
                                <Delete />
                        </Popconfirm>
                    </ActionButton>
                </li>
            </ul>
        </div>
    )
}

                // <li className={stl.taskcard_open_info}>       
                //     <ActionButton size={19} onClick={onOpenInfoTaskDrawer} tooltipText={tip.showInfo}>
                //         <OpenPanelRight style={{transform: "translateY(2px)"}}/> {/* TODO */}
                //     </ActionButton>
                // </li>
export default memo(TaskCardActions);
