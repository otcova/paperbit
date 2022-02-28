import { Graphics } from "./graphics";
import { PaperbitAPI as PaperbitAPI } from "./api/graphicsAPI";
import { ResultFrameData, StartFrameData } from "./interfaces";
export declare class PaperbitCanvas {
    protected paperbit: PaperbitCanvas;
    api: PaperbitAPI;
    private doFrame;
    graphics: Graphics;
    private mouse;
    private keyboard;
    constructor(container?: HTMLElement, doFrame?: (frameData: StartFrameData) => Promise<ResultFrameData> | ResultFrameData);
    protected draw(): Promise<void>;
}
