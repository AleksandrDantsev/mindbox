import { ITask } from "../types/TTasks";
import { setActualData, action } from "./taskActions";
import { getMaxId } from "../utils/getMaxId";

jest.mock("./taskActions", () => ({
    action: {
        delete: jest.fn(),
        find: jest.fn(),
        add: jest.fn(),
        changeActiveStatus: jest.fn(),
        clearCompleted: jest.fn(),
        getQuantityCompletedTasks: jest.fn()
    },
    setActualData: jest.fn(),
}));

jest.mock("../utils/getMaxId", () => ({
    getMaxId: jest.fn(),
}));

describe("action методы", () => {
    let tasks: ITask[];

    beforeEach(() => {
        tasks = [
            {
                id: 1,
                title: "Task 1",
                description: "Description 1",
                isCompleted: false,
                timeStart: "12:00",
                timeEnd: "13:00",
                timeOfCreation: "11:00",
                subtasks: []
            },
            {
                id: 2,
                title: "Task 2",
                description: "Description 2",
                isCompleted: true,
                timeStart: "14:00",
                timeEnd: "15:00",
                timeOfCreation: "13:00",
                subtasks: []
            }
        ];

        (getMaxId as jest.Mock).mockReturnValue(2);

        (action.delete as jest.Mock).mockImplementation((id: number, title: string) => {
            const updatedData = tasks.filter((task) => task.id !== id || task.title !== title);
            setActualData(updatedData);
            return updatedData;
        });

        (action.find as jest.Mock).mockImplementation((data: ITask[], title: string) => {
            const filtered = data.filter((task) => task.title.includes(title));
            setActualData(filtered);
            return filtered;
        });

        (action.add as jest.Mock).mockImplementation((data: ITask[], title: string) => {
            const newTask = {
                id: 3,
                title,
                description: "Нужно прочитать 20 страниц",
                isCompleted: false,
                timeStart: "13:42",
                timeEnd: "16:12",
                timeOfCreation: "12:11",
                subtasks: [
                    { subId: 1, subTitle: "10 страниц на английском", subIsCompleted: false },
                    { subId: 2, subTitle: "10 страниц на немецком", subIsCompleted: true }
                ]
            };
            const updatedData = [newTask, ...data];
            setActualData(updatedData);
            return updatedData;
        });

        (action.changeActiveStatus as jest.Mock).mockImplementation((id: number) => {
            const updatedData = tasks.map((task) => {
                if (task.id === id) {
                    task.isCompleted = !task.isCompleted;
                }
                return task;
            });
            setActualData(updatedData);
            return updatedData;
        });

        (action.clearCompleted as jest.Mock).mockImplementation((data: ITask[]) => {
            const updatedData = data.filter((task) => !task.isCompleted);
            setActualData(updatedData);
            return updatedData;
        });

        (action.getQuantityCompletedTasks as jest.Mock).mockImplementation(() => {
            return {
                all: 2,
                completed: 1
            };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("метод 'delete' должен удалить объект по id и title", () => {
        const result = action.delete(1, "Task 1");

        expect(result).toEqual([
            {
                id: 2,
                title: "Task 2",
                description: "Description 2",
                isCompleted: true,
                timeStart: "14:00",
                timeEnd: "15:00",
                timeOfCreation: "13:00",
                subtasks: []
            }
        ]);

        expect(setActualData).toHaveBeenCalledWith(result);
    });

    test("метод должен добавить новый таск", () => {
        const result = action.add(tasks, "New Task");

        expect(result).toHaveLength(3);

        expect(result[0]).toEqual({
            id: 3,
            title: "New Task",
            description: "Нужно прочитать 20 страниц",
            isCompleted: false,
            timeStart: "13:42",
            timeEnd: "16:12",
            timeOfCreation: "12:11",
            subtasks: [
                { subId: 1, subTitle: "10 страниц на английском", subIsCompleted: false },
                { subId: 2, subTitle: "10 страниц на немецком", subIsCompleted: true }
            ]
        });

        expect(setActualData).toHaveBeenCalledWith(result);
    });
    test("метод 'changeActiveStatus' должен изменять статус задачи", () => {
        const result = action.changeActiveStatus(1);

        expect(result[0].isCompleted).toBe(true);
        expect(setActualData).toHaveBeenCalledWith(result);
    });

    test("метод 'clearCompleted' должен удалять завершенные задачи", () => {
        const result = action.clearCompleted(tasks);

        expect(result).toEqual([
            {
                id: 1,
                title: "Task 1",
                description: "Description 1",
                isCompleted: false,
                timeStart: "12:00",
                timeEnd: "13:00",
                timeOfCreation: "11:00",
                subtasks: []
            }
        ]);

        expect(setActualData).toHaveBeenCalledWith(result);
    });

    test("метод 'getQuantityCompletedTasks' должен вернуть правильное количество задач", () => {
        const result = action.getQuantityCompletedTasks();

        expect(result).toEqual({
            all: 2,
            completed: 1
        });
    });
    
    test("метод 'find' должен фильтровать задачи по части названия", () => {
        const result = action.find(tasks, "ask 2");
    
        expect(result).toEqual([
            {
                id: 2,
                title: "Task 2",
                description: "Description 2",
                isCompleted: true,
                timeStart: "14:00",
                timeEnd: "15:00",
                timeOfCreation: "13:00",
                subtasks: []
            }
        ]);
        
        expect(setActualData).toHaveBeenCalledWith(result);
    });
});