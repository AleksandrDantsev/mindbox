import { useCallback, memo, useState } from "react";
import type { TChangeData } from "../../types/ChangeDataAction";
import { ITask } from "../../types/TTasks";
import stl from "./TaskCard.module.scss";
import InfoTaskDrawer from "../InfoTask/InfoTask";
import TaskCardActions from "../TaskCardActions/TaskCardActions";
import CompleteButton from "../../UI/CompleteButton/CompleteButton";
import InfoTaskDrawerLine from "../InfoTask/InfoTaskDrawerLine";
import { capitalize } from "../../utils/capitilize";


interface ITaskCard {
    dataItem: ITask;
    changeData: TChangeData;
    index: number;
    maxLenghtInput: number;
    isLastItemInList: boolean;
}

const TaskCard: React.FC<ITaskCard> = ({ dataItem, changeData, index, isLastItemInList, maxLenghtInput }) => {
    const [isOpenedDrawer, setIsOpenedDrawer] = useState<boolean>(false);
    const [isOpenInputForEditing, setIsOpenInputForEditing] = useState<boolean>(false);
    const [description, setDescription] = useState(dataItem.description);
    const [changedInputValue, setChangedInputValue] = useState<string>(dataItem.title);



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


    const onInputChangedValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value !== null) {
            setChangedInputValue(value);
        }
    }

    const toggleEditingField = () => {
        setIsOpenInputForEditing(!isOpenInputForEditing);

        if (isOpenInputForEditing && dataItem.title !== changedInputValue) {
            changeData({
                actionType: "changeTitleOfTask",
                id: dataItem.id,
                text: capitalize(changedInputValue)
            })
        }
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
                    {
                    isOpenInputForEditing ?
                        <textarea
                            className={stl.editable_title_block}
                            value={changedInputValue}
                            onChange={onInputChangedValue}
                            onBlur={toggleEditingField}
                            maxLength={maxLenghtInput}
                        />
                        :
                        <h3 className={dataItem.isCompleted ? stl.crossed_title : ""}>
                            {`${index + 1}. ` + dataItem.title}
                        </h3>
                    }
                </div>
                <TaskCardActions 
                    dataItem={dataItem} 
                    changeData={changeData} 
                    onOpenInfoTaskDrawer={onOpenInfoTaskDrawer}
                    isOpenInputForEditing={isOpenInputForEditing}
                    setIsOpenInputForEditing={toggleEditingField}
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
