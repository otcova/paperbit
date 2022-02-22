import { Tuple } from "../vec";
export declare type FrameData = {
    buffer: ArrayBuffer | SharedArrayBuffer;
    verticesCount: number;
};
declare class GraphicsStateStack {
    private stateStack;
    set color(c: number[] | number);
    get color(): [number, number, number, number];
    set stroke(enable: boolean);
    get stroke(): boolean;
    set lineColor(c: number[] | number);
    get lineColor(): number[] | number;
    set lineWidth(width: number);
    get lineWidth(): number;
    set lineCap(type: "round" | "square" | "butt");
    get lineCap(): "round" | "square" | "butt";
    set lineJoin(type: "round" | "miter" | "bevel" | "none");
    get lineJoin(): "round" | "miter" | "bevel" | "none";
    set texture(id: null | number | {
        slot: number;
    });
    get texture(): number | null;
    set quadUV(uv: Tuple<number, 8> | Tuple<number, 4>);
    get quadUV(): Tuple<number, 8> | Tuple<number, 4>;
    set matrix(mat: number[]);
    get matrix(): number[];
    rotateX(angle: number): void;
    rotateY(angle: number): void;
    rotateZ(angle: number): void;
    rotate(angle: number, axis?: [number, number, number]): void;
    scale(xy: number): void;
    scale(x: number, y: number): void;
    scale(x: number, y: number, z: number): void;
    translate(x: number, y: number): void;
    translate(x: number, y: number, z: number): void;
    push(): void;
    pop(): void;
    private get current();
    reset(): void;
}
declare class GraphicsFunctions {
    state: GraphicsStateStack;
    protected buffer: PushBuffer;
    constructor();
    triangleStrip(vertices: [number, number][] | [number, number, number][] | number[][]): void;
    background(...color: number[]): void;
    triangle(a: number[], b: number[], c: number[]): void;
    triangle(a: [number, number], b: [number, number], c: [number, number]): void;
    triangle(a: [number, number, number], b: [number, number, number], c: [number, number, number]): void;
    ellipse(x: number, y: number, diameter: number): void;
    ellipse(x: number, y: number, width: number, height?: number): void;
    rect(x: number, y: number, size: number): void;
    rect(x: number, y: number, width: number, height?: number): void;
    line(vertices: [number, number][], close?: boolean): void;
    private segment;
}
export declare class GraphicsAPI extends GraphicsFunctions {
    constructor();
    createFrame(): {
        verticesCount: number;
        buffer: ArrayBuffer;
    };
}
declare class PushBuffer {
    #private;
    f32: Float32Array;
    buffer: ArrayBuffer;
    BufferConstructor: ArrayBufferConstructor | SharedArrayBufferConstructor;
    size: number;
    constructor(reserve?: number, BufferConstructor?: ArrayBufferConstructor);
    push(data: number[]): void;
    clear(): ArrayBuffer;
}
export {};
