import { FontAtlas } from "./../font";
import { FrameData } from "./api/graphicsAPI";
import { Canvas } from "./canvas";
import { Paperbit } from "./paperbit";
import { GLBuffer, GLProgram, GLTexture } from "./webGlUtils";
export declare type canvasEventName = "resize";
interface Texture {
    size: [number, number];
    slot: number;
}
interface Font extends Texture {
    atlas: FontAtlas;
}
export declare class Graphics extends Canvas {
    bit: Paperbit;
    protected glProgram: GLProgram;
    protected glBuffer: GLBuffer;
    protected glTextures: GLTexture[];
    constructor(bit: Paperbit, publishEvent: (name: canvasEventName) => void, container: HTMLElement);
    render(frame: FrameData): void;
    loadTexture(url: string): Promise<Texture>;
    loadFont(urlBitmap: string, urlFnt: string): Promise<Font>;
}
export {};
