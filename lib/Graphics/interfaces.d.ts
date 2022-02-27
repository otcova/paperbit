export interface MouseData {
    pos: [number, number];
    left: number;
    right: number;
    middle: number;
    wheel: number;
}
export interface KeyboardData {
    keys: Map<string, number>;
    typed: string;
}
export interface StartFrameData {
    canvasSize: [number, number];
    mouse: MouseData;
    keyboard: KeyboardData;
}
export interface ResultFrameData {
    buffer: ArrayBuffer | SharedArrayBuffer;
    verticesCount: number;
}
