import { Paperbit } from "./paperbit";
export declare type paperbitEventsLoopNames = "setup" | "draw";
export declare class Frame {
    count: number;
    time: number;
    deltaTime: number;
    fps: number;
    size: [number, number];
    pixelSize: number;
    private pastTime;
    constructor(bit: Paperbit);
    private updateOnResize;
    private updateAfterDraw;
}
