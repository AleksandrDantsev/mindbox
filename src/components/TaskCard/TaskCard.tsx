import { useCallback, memo, useState } from "react";
import type { TChangeData } from "../../types/ChangeDataAction";
import { ITask } from "../../types/TTasks";
import stl from "./TaskCard.module.scss";
import InfoTaskDrawer from "../InfoTask/InfoTask";
import TaskCardActions from "../TaskCardActions/TaskCardActions";
import CompleteButton from "../../UI/CompleteButton/CompleteButton";
import InfoTaskDrawerLine from "../InfoTask/InfoTaskDrawerLine";

interface ITaskCard {
    dataItem: ITask;
    changeData: TChangeData;
    index: number;
    isLastItemInList: boolean;
}

const TaskCard: React.FC<ITaskCard> = ({ dataItem, changeData, index, isLastItemInList }) => {
    const [isOpenedDrawer, setIsOpenedDrawer] = useState<boolean>(false);
    const [description, setDescription] = useState(dataItem.description);


    const changeStatus = () => {
        changeData({actionType: "status", id: dataItem.id});
    };

    const onOpenInfoTaskDrawer = useCallback(() => {
        setIsOpenedDrawer(true);
    }, []);

    const onCloseInfoTaskDrawer = () => {
        setIsOpenedDrawer(false);

        if (description.length && description !== dataItem.description) {
            changeData({
                actionType: "setDescription",
                id: dataItem.id,
                text: description
            })
        }
    };

    const setNewDescription = (text: string) => {
        setDescription(text);
    }

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
                        {`${index + 1}. ` + dataItem.title}
                    </h3>
                </div>
                <TaskCardActions 
                    dataItem={dataItem} 
                    changeData={changeData} 
                    onOpenInfoTaskDrawer={onOpenInfoTaskDrawer} 
                    index={index}
                    isLastItemInList={isLastItemInList}
                />
            </div>
            <InfoTaskDrawer
                title={dataItem.title}
                size={"large"}
                isOpened={isOpenedDrawer}
                onClose={onCloseInfoTaskDrawer}
            >
                <InfoTaskDrawerLine 
                    dataItem={dataItem} 
                    setNewDescription={setNewDescription}
                    description={description}
                />
            </InfoTaskDrawer>
        </div>
    )
}

export default memo(TaskCard);
