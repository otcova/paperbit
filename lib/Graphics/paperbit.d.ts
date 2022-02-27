import { Graphics } from "./graphics";
import { GraphicsAPI } from "./api/graphicsAPI";
import { ResultFrameData, StartFrameData } from "./interfaces";
export declare class Paperbit {
    protected paperbit: Paperbit;
    api: GraphicsAPI;
    private doFrame;
    graphics: Graphics;
    private mouse;
    private keyboard;
    constructor(container?: HTMLElement, doFrame?: (frameData: StartFrameData) => Promise<ResultFrameData> | ResultFrameData);
    protected draw(): Promise<void>;
}
