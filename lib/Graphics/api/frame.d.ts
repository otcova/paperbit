import { beforeFrameCallback } from "./graphicsAPI";
export declare class Frame {
    count: number;
    time: number;
    deltaTime: number;
    fps: number;
    size: [number, number];
    pixelSize: number;
    private pastTime;
    constructor(beforeFrame: (callback: beforeFrameCallback) => void);
    private updateOnResize;
    private updateAfterDraw;
}
