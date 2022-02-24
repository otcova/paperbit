import { FontAtlas } from "../../font";
import { FrameData } from "../api/graphicsAPI";
import { Paperbit } from "./paperbit";
import { GLBuffer, GLProgram, GLTexture } from "./webGl";
interface Texture {
    size: [number, number];
    slot: number;
}
interface Font extends Texture {
    atlas: FontAtlas;
}
export declare class Graphics {
    paperbit: Paperbit;
    protected glProgram: GLProgram;
    protected glBuffer: GLBuffer;
    protected glTextures: GLTexture[];
    constructor(paperbit: Paperbit);
    render(frame: FrameData): void;
    loadTexture(url: string): Promise<Texture>;
    loadFont(urlBitmap: string, urlFnt: string): Promise<Font>;
}
export {};
