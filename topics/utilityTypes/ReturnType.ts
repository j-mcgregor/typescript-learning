import { logger, logLine } from '../functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * RETURN TYPE
 * Constructs a type consisting of the return type of function T
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
const f1 = (a: number, b: string) => ({ a, b });

type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T4 = ReturnType<typeof f1>; // { a: number, b: string }
type T5 = ReturnType<any>; // any
type T6 = ReturnType<never>; // any
// type T7 = ReturnType<string>;  // Error
// type T8 = ReturnType<Function>;  // Error
type T9 = ReturnType<() => Function>; // Error

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

// The above examples from the Typescript site aren't particularly helpful
// Example A
function getInt(a: string) {
    return parseInt(a);
}
// OR
// type func = (a: string) => number
// const getInt: func = (a: string): number => parseInt(a);

type A = ReturnType<typeof getInt>; // => number
const answerA: A = 1; // trying to set it as anything other than a number isn't allowed

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

// Example B
// ReturnTypes can return the created User type. This means we don't have to keep our types in sync with our function declaration
let id = 0;
function createUser(name: string, position: string) {
    return {
        id: id++,
        name,
        position,
        createdAt: new Date()
    };
}
// OR
// const createUser = (name: string, position: string) => ({
//     id: id++,
//     name,
//     position,
//     createdAt: new Date()
// });

type User = ReturnType<typeof createUser>;
// => {id: number, name: string, position: string, createdAt: Date}
const user1: User = { id: 1, position: 'missionary', name: 'Jack', createdAt: new Date() };

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

// Example C
// Interestingly type NoneType is defined as {type: string} but should actually be {type: "None"}.
// To enable TypeScript to infer the correct type, we need to be explicit about the None constant in this case.

const None = 'None';

function none1() {
    return { type: None };
}

function none2() {
    // removing the 'None as' bit of below will give you:
    // (property) type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
    return { type: None as typeof None };
}

type NoneType1 = ReturnType<typeof none1>; // => { type: string }
type NoneType2 = ReturnType<typeof none2>; // => { type: "None" }

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

// Example D
// Finally, let's see how we might be able to infer the return type of a generic function
function identity<T>(a: T): T {
    return a;
}

type IdentityType1 = ReturnType<typeof identity>; // => {}

// type IdentityType2 = ReturnType<typeof identity<number>>; // => syntax error "Expression expected"
// So we can't infer identity.
// How do we infer the return type of a generic function then?

// To describe a function type with an interface, we give the interface a call signature.
// This is like a function declaration with only the parameter list and return type given.
// Each parameter in the parameter list requires both name and type
interface Callable<ReturnType> {
    (...args: any[]): ReturnType;
}

type GenericReturnType<ReturnType, F> = F extends Callable<ReturnType> ? ReturnType : never;

type IdentityType3 = GenericReturnType<string, typeof identity>; // => string
type IdentityType4 = GenericReturnType<number, typeof identity>; // => number

// Not 100% sure of this method since we are actually defining the ReturnType - it isn't being inferred

export default function() {
    logLine('↓↓↓ ReturnType ↓↓↓');
    logger(answerA);
    logger(user1, true);
    logger('Check out the ReturnType.ts page for more information');
    logLine('↑↑↑ ReturnType ↑↑↑');
}
