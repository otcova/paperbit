import { Paperbit } from "./paperbit";
export declare type mouseEventName = "mouse" | "mouseDown" | "mouseDown" | "mouseUp" | "mouseMove" | "mouseWheel";
declare class Mouse {
    pos: [number, number];
    left: number;
    right: number;
    middle: number;
    wheel: number;
}
export declare class PaperbitMouse extends Mouse {
    past: Mouse;
    delta: Mouse;
    private bit;
    private publishEvent;
    constructor(bit: Paperbit, publishEvent: (name: mouseEventName) => void);
    protected updateMouse(e?: MouseEvent | WheelEvent): void;
}
export {};
