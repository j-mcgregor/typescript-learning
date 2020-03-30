import { logger, logLine } from '../functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * EXCLUDE
 * Constructs a type by excluding from T all properties that are assignable to U
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

type T0 = Exclude<'a' | 'b' | 'c', 'a'>; // "b" | "c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number

// From AdminUI:
// The Pick and Exclude types are part of the utility types provided in TypeScript
// The Pick utility type was introduced in TypeScript 2.1. Later on, in TypeScript 2.8, the Exclude type was added
// The combination of these two utility types enables the omission type to be written as follows
// from './Omit' : Omit<Todo, 'title' | 'completed'>;
//        A  B                         C  |-------- D --------|
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * A - Type (eg first 'argument') - type Todo { title: string; description: string; completed: boolean; }
 * B - the typeofs of A - 'title' | 'description' | 'completed'
 * C - again, the first argument
 * D - would look something like - Exclude<'title' | 'description' | 'completed', 'title'> // 'description' | 'completed'
 */

const letter1: T0 = 'b'; // trying to assign anything else will throw an error
const letter2: T1 = 'c'; // trying to assign anything else will throw an error

// const func1: T2 = () => {} // Type '() => void' is not assignable to type 'string | number'

export default function() {
    logLine('↓↓↓ Exclude ↓↓↓');
    logger(letter1);
    logger(letter2);
    logLine('↑↑↑ Exclude ↑↑↑');
}

/**
 * keyof
 */

interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[]; // "length" | "push" | "pop" | "concat" | ...
type K3 = keyof { [x: string]: Person }; // string | number
