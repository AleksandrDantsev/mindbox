export interface ITasks {
    [key: string]: ITask[];
};

export interface ITask {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    timeStart: string ;
    timeEnd: string;
    timeOfCreation: string;
    subtasks?: ISubtask[];
};

export interface ISubtask {
    subId: number;
    subTitle: string;
    subIsCompleted: boolean; 
};
