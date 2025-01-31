import { useState } from "react";
import stl from "./TodoList.module.scss";
import { Input, Layout, Switch } from 'antd';
import { Icon } from "@ricons/utils"; 
import { AddAlt, Search as ISearch } from "@ricons/carbon";
import TaskCard from "../../components/TaskCard/TaskCard";
import { tasks } from "../../data/tasks";
import { ITask } from "../../types/TTasks";
import PanelActionsTasks from "../../components/PanelActionsTasks/PanelActionsTasks";
import { action } from "../../helpers/taskActions";
import { capitalize } from "../../utils/capitilize";

const { Content } = Layout;
const { Search } = Input;

const payloadInput = {
    add: {
        placeholder: "Add",
        icon: 
            <Icon size={22} color={"#fffff"}>
                <AddAlt />
            </Icon>,
    },
    search: {
        placeholder: "Search",
        icon: 
        <Icon size={22} color={"#fffff"}>
                <ISearch />
            </Icon>,
    },
};

const currentDay = "16march2024";


const TodoList: React.FC = () => {
    const [data, setData] = useState<ITask[]>(tasks[currentDay]);
    const [actionInput, setActionInput] = useState("add");
    const [inputValue, setInputValue] = useState<string>("");

    const currentInputPayload = payloadInput[actionInput as keyof typeof payloadInput];
    console.log(data)
    const changeActionInput = (checked: boolean) => {
        setActionInput(checked ? "search" : "add");
    }

    const changeData = (actionType: string, id: number, title: string) => {
        switch(actionType) {
            case "delete":
                setData(action.delete(data, id, title));
                return;
            default: return;
        }
    }

    const findTaskByTitle = () => {
        if (inputValue?.length) {
            setData(action.find(data, inputValue));
        }
        if (inputValue!.length <= 1) {
            setData(tasks[currentDay]);
        }
    }

    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        if (actionInput === "add") {
            value = capitalize(value);
        }
        else {
            findTaskByTitle();
        }
        setInputValue(value);
    }

    const addTask = () => {
        if (!inputValue?.length) return;

        setData(action.add(data, inputValue));
        setInputValue("");
    };



    return (
        <div className={stl.todo_block}>
            <div className={stl.todo_container}>
                <div className={stl.todo_adding_search}>
                    <Search 
                        size="large" 
                        placeholder={currentInputPayload.placeholder} 
                        enterButton={currentInputPayload.icon}
                        onSearch={actionInput === "add" ? addTask : findTaskByTitle}
                        onChange={onChangeInputValue}
                        value={inputValue}
                    />
                    
                    <div className={stl.todo_switch_container}>
                        <Switch 
                            checkedChildren={"Search"} 
                            unCheckedChildren={"Add"} 
                            onChange={changeActionInput}/>
                    </div>
                </div>
                <div className={stl.todo_list}>
                    <Content style={{ overflowY: 'auto', height: '100%' }}>
                        {
                            data.map((item: ITask) => (
                                <TaskCard dataItem={item} changeData={changeData} />
                            ))
                        }
                    </Content>
                </div>
                <PanelActionsTasks />
            </div>
        </div>
    )
}

export default TodoList;
