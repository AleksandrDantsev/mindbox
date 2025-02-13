import { useMemo, useState, useCallback } from "react";
import stl from "./TodoList.module.scss";
import TaskCard from "../../components/TaskCard/TaskCard";
import { Input, Layout, message } from 'antd';
import { TaskAdd } from "@ricons/carbon";
import { tasks } from "../../data/tasks";
import { ITask } from "../../types/TTasks";
import { action } from "../../helpers/taskActions";
import { TTypeCompletedTask } from "../../types/ChangeDataAction";
import { capitalize } from "../../utils/capitilize";
import PanelActionsTasks from "../../components/PanelActionsTasks/PanelActionsTasks";
import NotFound from "../../components/NotFound/NotFound";
import { t } from "../../data/inscriptions";
import { CustomIcon } from "../../utils/customIcon";

const { Content } = Layout;
const { Search } = Input;

const currentDay = "16march2024"; // Временно


const TodoList: React.FC = () => {
    const [data, setData] = useState<ITask[]>(tasks[currentDay]);
    const [inputValue, setInputValue] = useState<string>("");
    const [typeTasks, setTypeTasks] = useState<TTypeCompletedTask>("All");
    const [messageApi, contextHolder] = message.useMessage();

    const qunatityCompletedTask = action.getQuantityCompletedTasks();


    const filteredTasks = useMemo(() => {
            if (typeTasks === "All") return data; 
            const isCurrentTaskCompleted = typeTasks === "Completed";

            return data.filter((item: ITask) => item.isCompleted === isCurrentTaskCompleted);
    }, [typeTasks, data])


    const changeData = useCallback(({ actionType, id, title, task, placement, text }: {
        actionType: string;
        id?: number;
        title?: string;
        placement?: "up" | "down";
        task?: ITask;
        text: string;
      }) => {
        const showMessage = (text: string) => {
            messageApi.open({
                type: 'success',
                content: text,
            });
        }

        switch(actionType) {
            case "delete":
                if (id !== undefined && title !== undefined) {
                    setData(action.delete(id, title));
                    showMessage(t.messages.successfullyDeleted);
                } return;

            case "status":
                if (id !== undefined) {
                    const targetTask = filteredTasks.find(el => el.id === id);
                    if (targetTask) {
                        const statusTaskText = targetTask.isCompleted ? 
                            t.messages.successfullyChangedStatusActive :
                            t.messages.successfullyChangedStatusCompleted; 
                        showMessage(statusTaskText);
                    }
                    setData(action.changeActiveStatus(id));
                } return;

            case "clearCompleted":
                setData(action.clearCompleted(data));
                showMessage(t.messages.successfullyDeletedAllTasks);
                return;

            case "moveTask":
                setData(action.moveTask(task, placement));
                return;

            case "setDescription":
                setData(action.setDescription(id, text));
                showMessage(t.messages.successfullySetDescription);
                return;
            default: return;
        }
    }, [data]);


    const changeFilterType = useCallback((type: TTypeCompletedTask): void => {
        setTypeTasks(type);
    }, []);


    const addTask = () => {
        if (!inputValue?.length) return;

        setData(action.add(data, inputValue));
        setInputValue("");
    };


    const SearchMemo = useMemo(() => {

        const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value.trim() || value.length === 0) {
                setInputValue(capitalize(value));
            };

        }

        const isAllowedAdding = typeTasks === "All" || typeTasks === "Active";
        const AddTaskIcon = CustomIcon(<TaskAdd />, 19, "#ffffff");

        return (
            <Search 
                size="large" 
                disabled={!isAllowedAdding}
                placeholder={t.placeholders.addTask} 
                enterButton={AddTaskIcon}
                onSearch={addTask}
                onChange={onChangeInputValue}
                value={inputValue}
            />
        )
    }, [inputValue, typeTasks]);


    const ContentMemo = useMemo(() => {
        return (
            <Content style={{ overflowY: 'auto', height: '100%' }}>
                {contextHolder}
                {
                    filteredTasks?.length ? filteredTasks.map((item: ITask) => (
                        <TaskCard 
                            key={item.id + item.title} 
                            index={filteredTasks.findIndex(task => task.id === item.id)}
                            dataItem={item} 
                            changeData={changeData}
                            isLastItemInList={filteredTasks.findIndex(task => task.id === item.id) === filteredTasks.length - 1}
                         />
                    )) :
                    <NotFound typeTab={typeTasks} textSearch={inputValue} />
                }
            </Content>
        )
    }, [filteredTasks]);

    return (
        <div className={stl.todo_block}>
            <div className={stl.todo_container}>
                <div className={stl.todo_adding_search}>
                    {SearchMemo}
                </div>
                <div className={stl.todo_list}>
                    {ContentMemo}
                </div>
                <PanelActionsTasks 
                    quantityCompleted={qunatityCompletedTask.completed} 
                    allQuantity={qunatityCompletedTask.all}
                    changeFilterType={changeFilterType}
                    changeData={changeData}
                />
            </div>
        </div>
    )
}

export default TodoList;
