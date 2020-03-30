import { logger, logLine } from '../functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * PICK
 * Constructs a type by picking the set of properties K from T
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

//  For Pick<> this could be either Type or Interface
type Todo = {
    title: string;
    description: string;
    completed: boolean;
};

// The second argument of Pick<> has to be a list or properties that actually exist on that Type / Interface
type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false
};

export default function() {
    logLine('↓↓↓ Pick ↓↓↓');
    logger(todo, true);
    logLine('↑↑↑ Pick ↑↑↑');
}
