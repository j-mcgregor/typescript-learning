import { logger, logLine } from './functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name PERSON
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export class Person {
    fullname: string;

    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullname = `${firstName} ${middleInitial} ${lastName}`;
    }

    printName = () => logger(this.fullname);
}

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name EMPLOYEE
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

const fullNameMaxLength = 10;

export class Employee {
    private _fullName: string | undefined;

    get fullName(): string | undefined {
        return this._fullName;
    }

    set fullName(newName: string | undefined) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error(`Full name has a max length of ${fullNameMaxLength}`);
        }

        this._fullName = newName;
    }
}

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name ANIMAL
 * @type SUPER CLASS
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export class Animal {
    protected name: string;
    private secret: string; // could also use #secret

    constructor(animalName: string) {
        this.name = animalName;
        this.secret = 'Im actually an alien but sshh!!';
    }

    move(distanceInMeters: number = 0) {
        logger(`${this.name} moved ${distanceInMeters}m`);
    }

    mySecret = () => logger(this.secret);
}

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name DOG
 * @type SUB CLASS
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export class Dog extends Animal {
    private dogname: string;

    constructor(dogname: string) {
        super('Dog');
        this.dogname = dogname;
    }

    bark() {
        logger(`Woof! My name is ${this.dogname} and I am a ${this.name}`);
    }
}

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>
 * @name SNAKE
 * @type SUB CLASS
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

export class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters = 123) {
        super.move(distanceInMeters);
    }
}

export default function runClassExamples(): void {
    logLine('↓↓↓ Classes ↓↓↓');

    const me = new Person('Joe', 'T', 'Bloggs');
    me.printName();

    const employee = new Employee();

    employee.fullName = 'Bob Smith';
    if (employee.fullName) logger(employee, true);

    const fido = new Dog('Fido');

    fido.bark();
    fido.move(100);
    // fido.name is protected
    // fido.secret is private

    // but calling the super.mySecret is ok but that function can see the secret, but not subclasses
    fido.mySecret();
    logLine('↑↑↑ Classes ↑↑↑');
}
