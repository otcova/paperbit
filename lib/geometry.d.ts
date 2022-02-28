declare class Point {
    coord: number[];
    constructor(coord: number[]);
    distanceTo(obj: Point | Rect): number | undefined;
}
declare class Segment {
    a: number[];
    b: number[];
    constructor(a: number[], b: number[]);
    distanceTo(obj: Point): number;
}
declare class Rect {
    a: number[];
    b: number[];
    constructor(coord: number[], size: number[]);
    distanceTo(obj: Point): number;
}
export declare const geometry: {
    point: (coord: number[]) => Point;
    segment: (a: number[], b: number[]) => Segment;
    rect: (coord: number[], size: number[]) => Rect;
};
export {};
