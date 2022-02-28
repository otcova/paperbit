export declare function setColor(buffer: [number, number, number, number] | number[], newColor: number[] | number): number[] | [number, number, number, number];
export declare class PushBuffer {
    #private;
    f32: Float32Array;
    buffer: ArrayBuffer;
    BufferConstructor: ArrayBufferConstructor | SharedArrayBufferConstructor;
    size: number;
    constructor(reserve?: number, BufferConstructor?: ArrayBufferConstructor);
    push(data: number[]): void;
    clear(): ArrayBuffer;
}
