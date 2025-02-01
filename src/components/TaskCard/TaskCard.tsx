import { useState, useCallback, memo } from "react";
import type { TChangeData } from "../../types/ChangeDataAction";
import { ITask } from "../../types/TTasks";
import stl from "./TaskCard.module.scss";
import InfoTaskDrawer from "../InfoTask/InfoTask";
import TaskCardActions from "../TaskCardActions/TaskCardActions";
import CompleteButton from "../../UI/CompleteButton/CompleteButton";

interface ITaskCard {
    dataItem: ITask;
    changeData: TChangeData;
}

const TaskCard: React.FC<ITaskCard> = ({ dataItem, changeData }) => {
    const [isOpenedDrawer, setIsOpenedDrawer] = useState<boolean>(false);

    const changeStatus = () => {
        changeData({actionType: "status", id: dataItem.id});
    };

    const onOpenInfoTaskDrawer = useCallback(() => {
        setIsOpenedDrawer(true);
    }, []);

    const onCloseInfoTaskDrawer = () => {
        setIsOpenedDrawer(false);
    };

    return (
        <div className={stl.taskcard}>
            <div className={stl.taskcard_container}>
                <div className={stl.taskcard_complete_button}>
                    <CompleteButton 
                        isCompleted={dataItem.isCompleted} 
                        onChange={changeStatus}
                    />
                </div>
                <div className={stl.taskcard_title}>
                    <h3 className={dataItem.isCompleted ? stl.crossed_title : ""}>
                        {dataItem.title}
                    </h3>
                </div>
                <TaskCardActions 
                    dataItem={dataItem} 
                    changeData={changeData} 
                    onOpenInfoTaskDrawer={onOpenInfoTaskDrawer} 
                    />
            </div>
            {/* <InfoTaskDrawer
                title={dataItem.title}
                size={"large"}
                isOpened={isOpenedDrawer}
                onClose={onCloseInfoTaskDrawer}
            >
                <p>sdfsdf</p>
            </InfoTaskDrawer> */}
        </div>
    )
}

export default memo(TaskCard);
