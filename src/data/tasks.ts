import { ITasks } from "../types/TTasks";

export const tasks: ITasks = {
    "16march2024": [
        {
            id: 1,
            title: "Читать книгу",
            description: "Нужно прочитать 20 страниц",
            isCompleted: false,
            timeStart: "13:42",
            timeEnd: "16:12",
            timeOfCreation: "12:11",
            subtasks: [
                {
                    subId: 1,
                    subTitle: "10 страниц на английском",
                    subIsCompleted: false
                },
                {
                    subId: 2,
                    subTitle: "10 страниц на немецком",
                    subIsCompleted: true
                },
            ]
        },
    ],
};