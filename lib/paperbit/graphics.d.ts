import { Paperbit } from "..";
import { FrameData } from "./graphicsAPI";
import { GLBuffer, GLProgram, GLTexture } from "./webGl";
interface Texture {
    size: [number, number];
    slot: number;
    type: "rgba" | "mask";
}
export declare class Graphics {
    paperbit: Paperbit;
    protected glProgram: GLProgram;
    protected glBuffer: GLBuffer;
    protected glTextures: GLTexture[];
    constructor(paperbit: Paperbit);
    render(frame: FrameData): void;
    loadTexture(url: string, type?: "rgba" | "mask"): Promise<Texture>;
}
export {};
