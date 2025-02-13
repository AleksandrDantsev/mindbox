import React, { useMemo } from "react";
import stl from "./PanelActionsTasks.module.scss";
import { Radio, Button } from 'antd';
import { TTypeCompletedTask } from "../../types/ChangeDataAction";
import { inscrButton as tip, inscrInfoTitles } from "../../data/inscriptions";
import type { TChangeData } from "../../types/ChangeDataAction";
import type { RadioChangeEvent } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

interface IPanelActionsTasks {
    quantityCompleted: number | string;
    allQuantity: number | string;
    changeFilterType: (type: TTypeCompletedTask) => void
    changeData: TChangeData;
}

const options: CheckboxGroupProps<string>['options'] = [
    { label: tip.all, value: tip.all },
    { label: tip.active, value: tip.active },
    { label: tip.completed, value: tip.completed },
];


const PanelActionsTasks: React.FC<IPanelActionsTasks> = ({ 
    quantityCompleted, 
    allQuantity, 
    changeData, 
    changeFilterType 
}) => {

    const clearCompletedTasks = () => {
        changeData({actionType: "clearCompleted"});
    }

    const onChange = (e: RadioChangeEvent) => {
        const value = e.target.value as TTypeCompletedTask;
        changeFilterType(value);
  };

    const ActionsPanelMemo = useMemo(() => (
        <React.Fragment>
            <div className={stl.todo_panel_radio}>
                <Radio.Group
                    size="small"
                    block
                    options={options}
                    defaultValue="All"
                    optionType="button"
                    buttonStyle="solid"
                    onChange={onChange}
                />
            </div>
            <div className={stl.todo_panel_clear_completed + ` ${quantityCompleted === 0 ? stl.disable_button_clear: ""}`}>
                <Button 
                    type="primary" 
                    variant="filled" 
                    color="danger"
                    onClick={clearCompletedTasks}
                >
                    {tip.deleteCompleted}
                </Button>
            </div>
        </React.Fragment>
    ), [quantityCompleted]);


    const CounterTask = useMemo(() => {
        let classCounter = "";
        let textContent = `Task completed: ${quantityCompleted} of ${allQuantity}`;

        if (allQuantity === quantityCompleted && allQuantity !== 0) { // Если все задачи выполнены
            classCounter = "all_tasks_completed";
            textContent = `${inscrInfoTitles.allTasksAreCompleted} (${quantityCompleted})`
        }
        else if (allQuantity === 0) { // Если нет задач
            classCounter = "no_tasks";
            textContent = inscrInfoTitles.noTasks;
        }
        return ( // Счетчик выполненных задач
            <span className={stl?.[classCounter]}>
                {textContent}
            </span>
        );
    }, [allQuantity, quantityCompleted]);


    return (
        <div className={stl.todo_panel_actions}>
            <div className={stl.todo_panel_all_left}>
                {CounterTask}
            </div>
            {ActionsPanelMemo}
        </div>
    )
}

export default PanelActionsTasks;
