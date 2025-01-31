import { ITask } from "../types/TTasks"
import { getMaxId } from "../utils/getMaxId";

type TAction = {
    delete: (data: ITask[], id: number, title: string) => ITask[];
    find: (data: ITask[], title: string) => ITask[];
    add: (data: ITask[], title: string) => ITask[];
}

const template = (title: string, id: number): ITask => (
    {
        id,
        title,
        description: "Нужно прочитать 20 страниц",
        isCompleted: false,
        timeStart: "13:42", // todo
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
    }
);


export const action: TAction = {
    delete: (data: ITask[], id: number, title: string) => {
        return data.filter((item: ITask) => item?.id !== id && item?.title !== title);
    },
    find: (data: ITask[], title: string) => {
        return data.filter((item: ITask) => item?.title.indexOf(title) !== -1);
    },
    add: (data: ITask[], title: string) => {
        const copyData = [...data];
        const newId = getMaxId(data) + 1;
        
        copyData.unshift(
            template(title, newId)
        );
        return copyData;
    },
}