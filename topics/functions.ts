import chalk from 'chalk';
import * as t from './types';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name logger
 * @param T = can be anything
 * @param toJSON - boolean
 * @returns void
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export const logger = <T>(t: T, toJSON: boolean = false): void => {
    const typeT = Array.isArray(t) ? 'array' : typeof t;
    console.log(`${chalk.yellow(typeT)} :`, chalk.blue(toJSON ? JSON.stringify(t) : t));
};

export const logLine = (title: string = ''): void => console.log(chalk.magenta(`--------------------- ${title} ---------------------`));

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @arg <T> - the 'variable' declaration a sa generic, meaning that its type will be determined when the function is invoked
 * @arg Array<T> - the actual usage of the Type, in this case in an array (also T[] is fine)
 * @arg T - the return value of the function
 * @returns T
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export const lastofArray = <T>(arr: Array<T>): T => arr[arr.length - 1];

/**
 *
 * @name makeArray
 * @param generic X
 * @param generic Y
 */

export const makeArray = <X, Y>(x: X, y: Y): [X, Y] => [x, y];

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name makeFullName
 * @returns T
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export const makeFullName = <T extends { firstName: string; lastName: string }>(obj: T): T => ({
    ...obj,
    fullName: `${obj.firstName} ${obj.lastName}`
});

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name sumArray
 * @param numArray
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export const sumArray = <N extends t.NumberArr>(arr: N): number => arr.reduce((p: number, n: number) => p + n);

// can also declare like so:
export type myMultiply = (val1: number, val2: number) => number;

// the below defined the variable type that will be created, which in this case is a type of ANONYMOUS function
export const multiply1: myMultiply = (val1: number, val2: number) => val1 * val2;
// however, named functions don't need to be declared as a TYPE of function by TS because that's what the 'function' keyword does.
// but we can still define the argument parameter types, either in angle brackets or next to the arg itself, and the functions RETURN TYPE
export function multiply2<N1 extends number>(val1: N1, val2: number): number {
    return val1 * val2;
}

// logger(multiply(2, 4));
/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name concatString
 * @param stringArray
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export const concatString = <S extends t.StringArr>(strArray: S): string => strArray.join(' ');

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name makeNumberTab
 * @param Tab
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export const makeNumberTab = <T extends t.NumberTab>({ id, position, data }: T): t.NumberTab => ({ id, position, data });

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name makeStringTab
 * @param Tab
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export const makeStringTab = <T extends t.StringTab>({ id, position, data }: T): t.StringTab => ({ id, position, data });

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name makeNumberTabArray
 * @param Tab
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export const makeNumberTabArray = <T extends t.NumberTabArray1>(numArr: T): t.NumberTabArray1 => numArr.map(obj => ({ ...obj }));

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name makeStringTabArray
 * @param Tab
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export const makeStringTabArray = <T extends t.StringTabArray1>(strArr: T): t.StringTabArray1 => strArr.map(obj => ({ ...obj }));

export default function runFunctionExamples(): void {
    logLine('↓↓↓ Functions ↓↓↓');
    const lastItem1 = lastofArray([1, 2, 3]);
    const lastItem2 = lastofArray(['1', '2', '3']);
    logger(lastItem1);
    logger(lastItem2);

    const array1 = makeArray(1, 'string');
    logger(array1);
    // can override the types...
    const array2 = makeArray<number, string>(1, 'string');
    const array3 = makeArray<number[], t.StringArr>([1, 2, 3], ['1', '2', '3']);
    logger(array2);
    logger(array3);

    // hover over result of makeFullName and you'll see the union of types
    const person1 = makeFullName({ firstName: 'Jack', lastName: 'McGregor' });
    const person2 = makeFullName({
        firstName: 'Jack',
        lastName: 'McGregor',
        age: 31
    });
    logger(person1, true);
    logger(person2, true);

    // passing a string too one will break it
    const sum1 = sumArray([1, 2, 3]);
    const sum2 = sumArray([11, 22, 33]);
    logger(sum1);
    logger(sum2);

    const str1 = concatString(['Hello', 'world']);
    const str2 = concatString(['Goodbye', 'world']);
    logger(str1);
    logger(str2);

    const numTab = makeNumberTab({ id: '123', position: 1, data: 123 });
    logger(numTab, true);

    const strTab = makeStringTab({ id: '123', position: 1, data: '123' });
    logger(strTab, true);

    const numTabArr = makeNumberTabArray([
        { id: '123', position: 1, data: 123 },
        { id: '456', position: 2, data: 456 }
    ]);
    logger(numTabArr, true);

    const strTabArr = makeStringTabArray([
        { id: '123', position: 1, data: '123' },
        { id: '456', position: 2, data: '456' }
    ]);
    logger(strTabArr, true);
    logLine('↑↑↑ Functions ↑↑↑');
}
