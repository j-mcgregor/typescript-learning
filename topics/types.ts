export interface Tab<T> {
    id: string;
    position: number;
    data: T;
}

export type NumberArr = Array<number>;
export type StringArr = Array<string>;

export type NumberTab = Tab<number>;
export type StringTab = Tab<string>;

export type NumberTabArray1 = Array<Tab<number>>;
export type NumberTabArray2 = Array<NumberTab>;

export type StringTabArray1 = Array<Tab<string>>;
export type StringTabArray2 = Array<StringTab>;
