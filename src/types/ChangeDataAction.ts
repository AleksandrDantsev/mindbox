import { ITask } from "./TTasks";

export type TChangeData = ({ actionType, id, title, type, placement, task, text }: {
    actionType: string;
    id?: number;
    title?: string;
    type?: TTypeCompletedTask;
    placement?: "up" | "down";
    task?: ITask;
    text?: string;
  }) => void;
  
export type TTypeCompletedTask = "Active" | "Completed" | "All";