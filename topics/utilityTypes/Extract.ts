import { logger, logLine } from '../functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * EXTRACT
 * Constructs a type by extracting from T all properties that are assignable to U
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () => void

// EXTRACT seems to only work on primitive lists, not on structs / objects
type Todo = {
    title: string;
    description: string;
    completed: boolean;
};
type TodoPreview = Extract<Todo, 'title'>;

// const todo: TodoPreview = { title: 'Clean room' }; // Type 'string' is not assignable to type 'never'

// However, using 'keyof' we can specify only the title property
type TodoTypes1 = keyof Todo;
type TodoTypes2 = Extract<keyof Todo, 'title'>;

const allowedProps: TodoTypes2 = 'title'; // anything else forbidden

export default function() {
    logLine('↓↓↓ Extract ↓↓↓');
    logger('Check out the Extract.ts page for more information');
    logLine('↑↑↑ Extract ↑↑↑');
}
