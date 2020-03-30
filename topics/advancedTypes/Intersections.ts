import { logger, logLine } from '../functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * INTERSECTIONS
 * An intersection type combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

/**
 * @name extend
 * @param first extends {}
 * @param second extends {}
 */

// 'first' is the class Person
// 'second' is the prototype {}
// A. `.hasOwnProperty` is on Objects so need to extend it
// B. extend() return type will be combination of both First and Second

// 					   |--------------- A --------------|                                 |----- B -----|
export function extend<First extends {}, Second extends {}>(first: First, second: Second): First & Second {
    // Partial Constructs a type with all properties of T set to optional. This utility will return a type that represents all subsets of a given type
    const result: Partial<First & Second> = {};

    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            // result[prop] = first[prop]

            (result as First)[prop] = first[prop];
        }
    }
    for (const prop in second) {
        logger(prop);
        if (second.hasOwnProperty(prop)) {
            (result as Second)[prop] = second[prop];
        }
    }
    logger(result, true);
    return result as First & Second;
}

export interface Loggable {
    log(name: string): void;
}

// typeof Function
// prototype {}
export class Person {
    constructor(public name: string) {}
}

// typeof Function
// prototype {}
export class ConsoleLogger implements Loggable {
    log(name: string) {
        logger(`Hello, I'm ${name}.`);
    }
}

export default function(): void {
    logLine('↓↓↓ Intersections ↓↓↓');
    const jim = extend(new Person('Jim'), ConsoleLogger.prototype);
    logger(ConsoleLogger);
    logger(Person);

    logger(jim, true);
    logLine('↑↑↑ Intersections ↑↑↑');
}
