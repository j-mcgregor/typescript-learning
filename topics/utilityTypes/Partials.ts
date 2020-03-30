import { logger, logLine } from '../functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * PARTIALS
 * Constructs a type with all properties of T set to optional. This utility will return a type that represents all subsets of a given type
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

interface Todo {
    title: string;
    description: string;
}

function updateTodo1(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
    return { ...todo, ...fieldsToUpdate };
}
// OR
const updateTodo2 = <T1 extends Todo, T2 extends Partial<Todo>>(todo: T1, fieldsToUpdate: T2): Todo => ({ ...todo, ...fieldsToUpdate });

const todo = {
    title: 'organize desk',
    description: 'clear clutter'
};

const updatedTodo1 = updateTodo1(todo, { description: 'throw out trash' });
const updatedTodo2 = updateTodo2(todo, { description: 'Rewrite functions' });

export default function() {
    logLine('↓↓↓ Partials ↓↓↓');
    logger(todo, true);
    logger(updatedTodo1, true);
    logger(updatedTodo2, true);
    logLine('↑↑↑ Partials ↑↑↑');
}
