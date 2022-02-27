import { FontAtlas } from "./../font";
import { Canvas } from "./canvas";
import { ResultFrameData } from "./interfaces";
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
    protected glProgram: GLProgram;
    protected glBuffer: GLBuffer;
    protected glTextures: GLTexture[];
    constructor(container: HTMLElement);
    render(frame: ResultFrameData): void;
    loadTexture(url: string): Promise<Texture>;
    loadFont(urlBitmap: string, urlFnt: string): Promise<Font>;
}
export {};
