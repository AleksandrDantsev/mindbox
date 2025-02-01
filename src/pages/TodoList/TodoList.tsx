import { useMemo, useState, useCallback } from "react";
import stl from "./TodoList.module.scss";
import TaskCard from "../../components/TaskCard/TaskCard";
import { Input, Layout, Switch } from 'antd';
import { AddAlt, Search as ISearch } from "@ricons/carbon";
import { Icon } from "@ricons/utils"; 
import { tasks } from "../../data/tasks";
import { ITask } from "../../types/TTasks";
import { action } from "../../helpers/taskActions";
import { TTypeCompletedTask } from "../../types/ChangeDataAction";
import { capitalize } from "../../utils/capitilize";
import PanelActionsTasks from "../../components/PanelActionsTasks/PanelActionsTasks";
import NotFound from "../../components/NotFound/NotFound";

const { Content } = Layout;
const { Search } = Input;

const payloadInput = {
    add: {
        placeholder: "Add a task",
        icon: 
            <Icon size={19} color={"#fffff"}>
                <AddAlt />
            </Icon>
    },
    search: {
        placeholder: "Search a task",
        icon: 
            <Icon size={19} color={"#fffff"}>
                    <ISearch />
            </Icon>
    }
};

const currentDay = "16march2024"; // Временно


const TodoList: React.FC = () => {
    const [data, setData] = useState<ITask[]>(tasks[currentDay]);
    const [actionInput, setActionInput] = useState<"search" | "add">("add");
    const [inputValue, setInputValue] = useState<string>("");
    const [typeTasks, setTypeTasks] = useState<TTypeCompletedTask>("All");

    const currentInputPayload = payloadInput[actionInput as keyof typeof payloadInput];
    console.log("")
    console.log(data, "State данные")
    console.log(tasks["16march2024"], "Первоначальные данные")

    const qunatityCompletedTask = action.getQuantityCompletedTasks();

    // const changeActionInput = (checked: boolean) => {
    //     setActionInput(checked ? "search" : "add");
    // }

    const filteredTasks = useMemo(() => {
            if (typeTasks === "All") return data; 
            const condition = typeTasks === "Completed";

            return data.filter((item: ITask) => item.isCompleted === condition)
    }, [typeTasks, data])

    const changeData = useCallback(({ actionType, id, title }: {
        actionType: string;
        id?: number;
        title?: string;
      }) => {
        switch(actionType) {
            case "delete":
                if (id !== undefined && title !== undefined) {
                    setData(action.delete(id, title));
                } return;

            case "status":
                if (id !== undefined) {
                    setData(action.changeActiveStatus(id));
                } return;

            case "clearCompleted":
                setData(action.clearCompleted(data));
                return;

            default: return;
        }
    }, [data])

    const changeFilterType = useCallback((type: TTypeCompletedTask): void => {
        setTypeTasks(type);
    }, [])

    const addTask = () => {
        if (!inputValue?.length) return;

        setData(action.add(data, inputValue));
        setInputValue("");
    };




    const SearchMemo = useMemo(() => {
        // const findTaskByTitle = () => {
        //     if (inputValue?.length) {
        //         console.log(filteredTasks, inputValue)
        //         setData(action.find(data, inputValue));
        //     }
        //     if (inputValue!.length <= 1) {
        //         setData(tasks[currentDay]);
        //     }
        // }

        const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value
            if (actionInput === "add") {
                value = capitalize(value);
            }
            // else {
            //     findTaskByTitle();
            // }
            setInputValue(value);
        }

        const isAllowedAdding = typeTasks === "All" || actionInput === "search";

        return (
            <Search 
                size="large" 
                disabled={!isAllowedAdding}
                placeholder={currentInputPayload.placeholder} 
                enterButton={currentInputPayload.icon}
                onSearch={actionInput === "add" ? addTask : () => {}}
                onChange={onChangeInputValue}
                value={inputValue}
            />
        )
    }, [inputValue, typeTasks, actionInput])


    const ContentMemo = useMemo(() => (
        <Content style={{ overflowY: 'auto', height: '100%' }}>
            {
                filteredTasks.length ? filteredTasks.map((item: ITask) => (
                    <TaskCard dataItem={item} changeData={changeData} key={item.id + item.title} />
                )) :
                <NotFound typeInput={actionInput} typeTab={typeTasks} textSearch={inputValue} />
            }
        </Content>
    ), [filteredTasks]);


    // const SwitcherMemo = useMemo(() => (
    //     <Switch 
    //         checkedChildren={"Search"} 
    //         unCheckedChildren={"Add"} 
    //         onChange={changeActionInput}
    //     />
    // ), []);

    
    return (
        <div className={stl.todo_block}>
            <div className={stl.todo_container}>
                <div className={stl.todo_adding_search}>
                    {SearchMemo}
                    {/* <div className={stl.todo_switch_container}>
                        {SwitcherMemo}
                    </div> */}
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
