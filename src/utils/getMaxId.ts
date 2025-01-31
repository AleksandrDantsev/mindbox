import { ITask } from "../types/TTasks";

export const getMaxId = (data: ITask[]): number => {
    let currentMax = 0;
    data.forEach((item: ITask) => {
        if (item.id > currentMax) currentMax = item.id;
    })

    return currentMax;
};