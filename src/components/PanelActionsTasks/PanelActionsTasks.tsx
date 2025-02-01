import React, { useMemo } from "react";
import stl from "./PanelActionsTasks.module.scss";
import { Radio, Button } from 'antd';
import { TTypeCompletedTask } from "../../types/ChangeDataAction";
import { t } from "../../data/inscriptions";
import type { TChangeData } from "../../types/ChangeDataAction";
import type { RadioChangeEvent } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

interface IPanelActionsTasks {
    quantityCompleted: number | string;
    allQuantity: number | string;
    changeFilterType: (type: TTypeCompletedTask) => void
    changeData: TChangeData;
}

const tip = t.buttons;

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
        console.log(value)
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
            <div className={stl.todo_panel_clear_completed}>
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

    return (
        <div className={stl.todo_panel_actions}>
            <div className={stl.todo_panel_all_left}>
                <span>{`Task completed: ${quantityCompleted} of ${allQuantity}`}</span>
            </div>
            {ActionsPanelMemo}
        </div>
    )
}

export default PanelActionsTasks;
