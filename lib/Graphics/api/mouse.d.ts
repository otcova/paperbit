import { beforeFrameCallback } from "./graphicsAPI";
declare class MouseState {
    pos: [number, number];
    left: number;
    right: number;
    middle: number;
    wheel: number;
}
export declare class Mouse extends MouseState {
    delta: MouseState;
    past: MouseState;
    onMove?: (mouse: Mouse) => void;
    onWheel?: (mouse: Mouse) => void;
    onDown?: (mouse: Mouse) => void;
    onUp?: (mouse: Mouse) => void;
    private pastMouseData;
    constructor(beforeFrame: (callback: beforeFrameCallback) => void);
    private useMouseButtonData;
}
export {};
