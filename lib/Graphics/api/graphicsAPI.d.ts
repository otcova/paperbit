import { ResultFrameData, StartFrameData } from "../interfaces";
import { Frame } from "./frame";
import { GraphicsFunctions } from "./graphicsFunctions";
import { Keyboard } from "./keyboard";
import { Mouse } from "./mouse";
export declare type beforeFrameCallback = (data: StartFrameData) => void;
export declare type afterFrameCallback = () => void;
export declare class PaperbitAPI extends GraphicsFunctions {
    frame: Frame;
    mouse: Mouse;
    keyboard: Keyboard;
    onStart?: (api: PaperbitAPI) => Promise<void> | void;
    onDraw?: (api: PaperbitAPI) => void;
    private beforeFrameCallbacks;
    constructor(onStartFrame: (callback: (frameData: StartFrameData) => Promise<ResultFrameData>) => void);
    private doFrame;
}
