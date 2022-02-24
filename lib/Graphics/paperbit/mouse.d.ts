import { Paperbit } from "./paperbit";
export declare type mouseEventsNames = "mouse" | "mouseDown" | "mouseDown" | "mouseUp" | "mouseMove" | "mouseWheel";
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
    private sendEvent;
    constructor(bit: Paperbit, sendEvent: (name: mouseEventsNames) => void);
    protected updateMouse(e?: MouseEvent | WheelEvent): void;
}
export {};
