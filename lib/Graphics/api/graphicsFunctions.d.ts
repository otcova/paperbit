import { Frame } from "./frame";
import { PushBuffer } from "./innerUtils";
import { GraphicsStateStack } from "./state";
export declare abstract class GraphicsFunctions {
    abstract frame: Frame;
    state: GraphicsStateStack;
    protected buffer: PushBuffer;
    constructor();
    triangleStrip(vertices: [number, number][] | [number, number, number][] | number[][]): void;
    background(...color: number[]): void;
    triangle(a: number[], b: number[], c: number[]): void;
    triangle(a: [number, number], b: [number, number], c: [number, number]): void;
    triangle(a: [number, number, number], b: [number, number, number], c: [number, number, number]): void;
    ellipse(x: number, y: number, diameter: number): void;
    ellipse(x: number, y: number, width: number, height?: number): void;
    rect(x: number, y: number, size: number): void;
    rect(x: number, y: number, width: number, height?: number): void;
    line(vertices: [number, number][], close?: boolean): void;
    private segment;
    text(text: string, x: number, y: number, scale?: number): void;
    textWidth(text: string, nextChar?: string): number;
    private drawChar;
    private genTextureClass;
}
