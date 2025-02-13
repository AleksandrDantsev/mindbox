import { ITasks, ITask } from "../types/TTasks";
import { appSetting } from "../appSettings";
import { setTimeNow } from "../utils/setTimeNow";
import { descDinner, descFeedingCat, descReading, washingCar } from "./mockDescriptions";
import { LocalStorage } from "../utils/localStorage";

const timeNow = setTimeNow();
const timeEnd = setTimeNow(5);


export const createTask = ({
    id,
    title,
    description = "",
    isCompleted = false,
    timeStart = setTimeNow(1),
    timeEnd = setTimeNow(5),
    timeOfCreation = setTimeNow(),
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
            title: "Read a Book",
            description: descReading,
            isCompleted: false,
            timeStart: timeNow,
            timeEnd: timeEnd,
            timeOfCreation: timeNow,
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
            title: "Prepare Dinner",
            description: descDinner,
            isCompleted: true,
            timeStart: timeNow,
            timeEnd: timeEnd,
            timeOfCreation: timeNow,
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
            title: "Feed the Cat",
            description: descFeedingCat,
            isCompleted: false,
            timeStart: timeNow,
            timeEnd: timeEnd,
            timeOfCreation: timeNow,
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
            id: 4,
            title: "Wash the Car",
            description: washingCar,
            isCompleted: true,
            timeStart: timeNow,
            timeEnd: timeEnd,
            timeOfCreation: timeNow,
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


const storedData = LocalStorage("get", appSetting.localStorageName);

if (storedData) tasks = storedData;
else LocalStorage("set", appSetting.localStorageName, tasks);

export { tasks };