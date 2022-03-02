export declare type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
declare type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;
declare class Vec {
    new<N extends number, T extends number[] | Tuple<number, N>>(length: number | T, callback: (i: number) => number): T;
    new<N extends number, T extends number[] | Tuple<number, N>>(length: number, defaultValue: number): T;
    equal(a: number[], b: number[], tolerance?: number | number[]): boolean;
    add(v: number[] | number, ...vectors: (number[] | number)[]): number[];
    sub(v: number[] | number, ...vectors: (number[] | number)[]): number[];
    mult<N extends number, T extends Tuple<number, N> | number[]>(v: T | number, ...vectors: (T | number)[]): T;
    div(v: number[] | number, ...vectors: (number[] | number)[]): number[];
    round(v: number[]): number[];
    floor(v: number[]): number[];
    ceil(v: number[]): number[];
    distance(a: number[], b: number[]): number;
    dot(v: number[], u: number[]): number;
    length(v: number[]): number;
    resize<N extends number, T extends number[] | Tuple<number, N>>(v: T, newSize: number): T;
    normalize<N extends number, T extends number[] | Tuple<number, N>>(v: T): T;
}
declare class Matrix {
    new([width, height]: [number, number], identityValue?: number): number[];
    new([width, height]: [number, number], callback: ([x, y]: [number, number]) => number): number[];
    add(matA: number[], matB: number[]): number | number[];
    sub(matA: number[], matB: number[]): number | number[];
    mult(matA: number[], matB: number[]): number | number[];
    div(matA: number[], matB: number[]): number | number[];
    dot(matA: number[], matAWidth: number, matB: number[], matBWidth: number): number[];
    dot(matA: number[], matAWidth: number, vector: number[]): number[];
    invert4x4(m: number[]): number[];
}
export declare const vec: Vec;
export declare const matrix: Matrix;
export {};
