import { logger, logLine } from '../functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * OMIT
 * Constructs a type by picking all properties from T and then removing K.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

//  For Omit<> this could be either Type or Interface
type Todo = {
    title: string;
    description: string;
    completed: boolean;
};

// !!!!!!!! Omit is the inverse of Pick !!!!!!!!!!!
type TodoPreview = Omit<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
    description: 'Some task to do'
};

export default function() {
    logLine('↓↓↓ Omit ↓↓↓');
    logger(todo, true);
    logLine('↑↑↑ Omit ↑↑↑');
}
