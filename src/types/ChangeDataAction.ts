export type TChangeData = ({ actionType, id, title, type }: {
    actionType: string;
    id?: number;
    title?: string;
    type?: TTypeCompletedTask;
  }) => void;
  
export type TTypeCompletedTask = "Active" | "Completed" | "All";