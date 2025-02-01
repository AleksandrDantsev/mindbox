import { getMaxId } from '../getMaxId';
import { ITask } from '../../types/TTasks';

describe('getMaxId', () => {
    it('должна вернуть правильный максимальный id', () => {
        const tasks: Partial<ITask>[] = [
        { id: 1, title: 'Task 1', isCompleted: false },
        { id: 5, title: 'Task 2', isCompleted: true },
        { id: 3, title: 'Task 3', isCompleted: false },
        ];

        const result = getMaxId(tasks as ITask[]);
        expect(result).toBe(5);
    });


    it('должна вернуть id задачи, если в списке только одна задача', () => {
        const tasks: Partial<ITask>[] = [
        { id: 10, title: 'Task 1', isCompleted: false }
        ];

        const result = getMaxId(tasks as ITask[]);
        expect(result).toBe(10);
    });


    it('должна вернуть 0, если список задач пустой', () => {
        const tasks: Partial<ITask>[] = [];

        const result = getMaxId(tasks as ITask[]);
        expect(result).toBe(0);
    });


    it('должна вернуть тот же id, если все задачи имеют одинаковый id', () => {
        const tasks: Partial<ITask>[] = [
        { id: 3, title: 'Task 1', isCompleted: false },
        { id: 3, title: 'Task 2', isCompleted: true },
        { id: 3, title: 'Task 3', isCompleted: false },
        ];

        const result = getMaxId(tasks as ITask[]);
        expect(result).toBe(3);
    });
    });