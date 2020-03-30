import { logger, logLine } from '../functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * READONLY
 * Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

/**
 * -----------------------------------
 * BASIC
 * -----------------------------------
 */

interface Todo {
    title: string;
    description?: string;
}

const todo: Readonly<Todo> = {
    title: 'Delete inactive users'
};

/**
 * -----------------------------------
 * INTERMEDIATE
 * -----------------------------------
 */

type Point = {
    readonly x: number;
    readonly y: number;
};

// origin.x and origin.y are permanently set
const origin: Point = { x: 100, y: 200 };

function moveX(p: Point, offset: number): Point {
    // trying to change the value of a property will throw an error
    // p.x += offset;
    // return p;

    // so better to create and return a new object
    return {
        x: p.x + offset,
        y: p.y
    };
}

const changedOrigin = moveX(origin, 30);

/**
 * -----------------------------------
 * CLASSES
 * -----------------------------------
 */

//  To make a class property 'readonly', it has to be specified IN the class

class Circle1 {
    readonly radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    get area() {
        return Math.PI * this.radius ** 2;
    }
}

const circle1 = new Circle1(1);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// the below method doesn't work for Readonly: it will tell the class to require the type but won't make the propety readonly

type Circle2Props = {
    readonly radius: number;
};

class Circle2 implements Circle2Props {
    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    get area() {
        return Math.PI * this.radius ** 2;
    }
}

const circle2 = new Circle2(1);

/**
 * -----------------------------------
 * READONLY INDEX SIGNATURES
 * Additionally, index signatures can be marked with the readonly modifier.
 * The ReadonlyArray<T> type makes use of such an index signature to prevent assignments to indexed properties
 * -----------------------------------
 */

const arr1: Array<number> = [2, 3, 5, 7];
const arr2: ReadonlyArray<number> = arr1;

/*
	arr2[5] = 5;      // Error, elements are read-only
	arr2.push(5);     // Error, no push method (because it mutates array)
	arr2.length = 3;  // Error, length is read-only
	a = arr2;         // Error, mutating methods are missing
*/

export default function() {
    logLine('↓↓↓ Readonly ↓↓↓');
    // todo.title = 'Hello'; // Error: cannot reassign a readonly property
    logger(todo, true);

    logger(changedOrigin, true);

    logger(circle1, true);
    // circle1.radius = 123; // Error
    logger(circle1.radius);
    // circle1.area = 1.123456; // Error
    logger(circle1.area);

    logger(circle2, true);
    circle2.radius = 123; // Error
    logger(circle2.radius);
    // circle2.area = 1.123456; // Error
    logger(circle2.area);

    logger(arr1, true);
    logger(arr2, true);

    logLine('↑↑↑ Readonly ↑↑↑');
}
