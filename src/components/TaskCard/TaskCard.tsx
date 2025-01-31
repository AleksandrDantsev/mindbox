import stl from "./TaskCard.module.scss";
import { useState } from "react";
import InfoTaskDrawer from "../InfoTask/InfoTask";
import { ITask } from "../../types/TTasks";
import TaskCardActions from "../TaskCardActions/TaskCardActions";


import CompleteButton from "../../UI/CompleteButton/CompleteButton";

interface ITaskCard {
    dataItem: ITask;
    changeData: (actionType: string, id: number, title: string) => void;
}

const TaskCard: React.FC<ITaskCard> = ({ dataItem, changeData }) => {
    const [isOpenedDrawer, setIsOpenedDrawer] = useState<boolean>(false);

    const ch = (t) => {
        
        console.log(dataItem)
    };

    const onOpenInfoTaskDrawer = () => {
        setIsOpenedDrawer(true);
    };
    const onCloseInfoTaskDrawer = () => {
        setIsOpenedDrawer(false);
    };

    return (
        <div className={stl.taskcard}>
            <div className={stl.taskcard_container}>
                <div className={stl.taskcard_complete_button}>
                    <CompleteButton 
                        isCompleted={dataItem.isCompleted} 
                        onChange={ch}
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
                <InfoTaskDrawer
                    title={dataItem.title}
                    size={"large"}
                    isOpened={isOpenedDrawer}
                    onClose={onCloseInfoTaskDrawer}
                >
                    <p>sdfsdf</p>
                </InfoTaskDrawer>
            </div>
        </div>
    )
}

export default TaskCard;
