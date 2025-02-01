import { ITask } from "../types/TTasks"
import { getMaxId } from "../utils/getMaxId";
import { tasks, createTask } from "../data/tasks";
import { appSetting } from "../appSettings";

type TAction = {
    delete: (id: number, title: string) => ITask[];
    find: (data: ITask[], title: string) => ITask[];
    add: (data: ITask[], title: string) => ITask[];
    getQuantityCompletedTasks: () => {all: number, completed: number};
    changeActiveStatus: (id: number) => ITask[];
    clearCompleted: (data: ITask[]) => ITask[];
}

const day = "16march2024"; // todo

export const setActualData = (data: ITask[]): void => {
    tasks[day] = data;
    localStorage.setItem(appSetting.localStorageName, JSON.stringify(tasks));
};


export const action: TAction = {
    delete: (id: number, title: string) => {
        const result = tasks[day].filter((item: ITask) => item?.id !== id || item?.title !== title);
        setActualData(result);
        return result;
    },

    find: (data: ITask[], title: string) => {
        return data.filter((item: ITask) => item?.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
    },

    add: (data: ITask[], title: string) => {
        const copyData = [...data];
        const newId = getMaxId(data) + 1;
        
        copyData.unshift(
            createTask({
                title,
                id: newId,
                description: "",
                isCompleted: false,
                timeStart: "",
                timeEnd: "",
                timeOfCreation: "",
                subtasks: [
                {
                    subId: 1,
                    subTitle: "",
                    subIsCompleted: false
                },
                {
                    subId: 2,
                    subTitle: "",
                    subIsCompleted: true
                },
            ]
            })
        );
        setActualData(copyData);
        return copyData;
    },

    changeActiveStatus: (id: number) => {
        const result = tasks[day].map((item: ITask) => {
            if (item?.id === id) item.isCompleted = !item.isCompleted;
            return item;
        })
        setActualData(result);
        return result
    },

    clearCompleted: (data: ITask[]) => {
        const result = data.filter((item: ITask) => !item.isCompleted);
        setActualData(result);
        return result;
    },

    getQuantityCompletedTasks: () => {
        const quantity = {
            all: tasks[day].length,
            completed: 0,
        };
        tasks[day].forEach((item: ITask) => {
            if (item?.isCompleted) quantity.completed++;
        })
        return quantity;
    },

}