import { capitalize } from "../capitilize";

describe('capitalize', () => {
    it('Первая буква', () => {
        expect(capitalize('hello')).toBe('Hello');
        expect(capitalize('world')).toBe('World');
    });

    it('Идентичный результат при капитализации', () => {
        expect(capitalize('Hello')).toBe('Hello');
    });

    it('Пустая строка', () => {
        expect(capitalize('')).toBe('');
    });

    it('Обратная капитализация', () => {
        expect(capitalize('tHIS is a tEsT')).toBe('This is a test');
    });

    it('Один символ', () => {
        expect(capitalize('a')).toBe('A');
        expect(capitalize('Z')).toBe('Z');
    });
  });