import { MouseData } from "./interfaces";
export declare class PaperbitMouse implements MouseData {
    pos: [number, number];
    left: number;
    right: number;
    middle: number;
    wheel: number;
    private offsetLeft;
    private offsetMiddle;
    private offsetRight;
    private canvas;
    constructor(canvas: HTMLCanvasElement);
    protected updateMouse(e: MouseEvent): void;
    private updateButtons;
    private updateWheel;
    pullData(): MouseData;
}
