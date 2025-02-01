import { ITasks, ITask } from "../types/TTasks";
import { appSetting } from "../appSettings";


export const createTask = ({
    id,
    title,
    description = "",
    isCompleted = false,
    timeStart = "",
    timeEnd = "",
    timeOfCreation = "",
    subtasks = [],
    }: ITask
): ITask => (
    {
        id,
        title,
        description,
        isCompleted,
        timeStart,
        timeEnd,
        timeOfCreation,
        subtasks,
    }
);


 let tasks: ITasks = {
    "16march2024": [
        createTask({
            id: 1,
            title: "Прочитать книгу",
            description: "Нужно прочитать 20 страниц",
            isCompleted: false,
            timeStart: "13:42",
            timeEnd: "16:12",
            timeOfCreation: "12:11",
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
        }),
        createTask({
            id: 2,
            title: "Приготовить ужин",
            description: "",
            isCompleted: true,
            timeStart: "13:42",
            timeEnd: "16:12",
            timeOfCreation: "12:11",
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
        }),
        createTask({
            id: 3,
            title: "Покормить кота",
            description: "",
            isCompleted: false,
            timeStart: "13:42",
            timeEnd: "16:12",
            timeOfCreation: "12:11",
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
        }),
    ],
};


const storedData = localStorage.getItem(appSetting.localStorageName);

if (storedData) {
    tasks = JSON.parse(storedData);
}
else {
    localStorage.setItem(appSetting.localStorageName, JSON.stringify(tasks));
}

export { tasks };