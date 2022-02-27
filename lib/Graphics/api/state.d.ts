import { FontAtlas } from "../../font";
import { Tuple } from "../../vec";
declare type Origin = [0, 0] | [0, 1] | [0, -1] | [1, 0] | [1, 1] | [1, -1] | [-1, 0] | [-1, 1] | [-1, -1];
interface TextureType {
    slot: number;
}
interface FontType extends TextureType {
    atlas: FontAtlas;
}
export declare class GraphicsStateStack {
    private stateStack;
    set color(c: number[] | number);
    get color(): [number, number, number, number];
    set colorHex(c: number[] | number);
    get colorHex(): [number, number, number, number];
    set colorAlpha(alpha: number);
    get colorAlpha(): number;
    set lineColor(c: number[] | number);
    get lineColor(): number[] | number;
    set lineWidth(width: number);
    get lineWidth(): number;
    set lineCap(type: "round" | "square" | "butt");
    get lineCap(): "round" | "square" | "butt";
    set lineJoin(type: "round" | "miter" | "bevel" | "none");
    get lineJoin(): "round" | "miter" | "bevel" | "none";
    set font(font: null | FontType);
    get font(): null | FontType;
    set texture(tex: null | TextureType);
    get texture(): null | TextureType;
    set textureColorBlend(algorithm: "+" | "*" | "*r");
    get textureColorBlend(): "+" | "*" | "*r";
    set rectUV(uv: Tuple<number, 4 | 8>);
    get rectUV(): Tuple<number, 4 | 8>;
    set rectOrigin(origin: Origin);
    get rectOrigin(): Origin;
    set matrix(mat: number[]);
    get matrix(): number[];
    get inverseMatrix(): number[];
    set textOrigin(origin: Origin);
    get textOrigin(): Origin;
    rotateX(angle: number): void;
    rotateY(angle: number): void;
    rotateZ(angle: number): void;
    rotate(angle: number, axis?: [number, number, number]): void;
    scale(xy: number): void;
    scale(x: number, y: number): void;
    scale(x: number, y: number, z: number): void;
    translate(x: number, y: number): void;
    translate(x: number, y: number, z: number): void;
    scope(scopedCode: () => void): void;
    private get current();
    reset(): void;
}
export {};
