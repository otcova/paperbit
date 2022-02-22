import { Graphics } from "./graphics";
import { GraphicsAPI } from "./graphicsAPI";
declare type PaperbitEvents = "setup" | "draw" | "resize" | "mouseMove" | "mouseDown" | "mouseUp" | "mouseWheel" | "mouse" | "keyDown" | "keyUp" | "keyPress";
declare type onType = {
    [key in PaperbitEvents]?: (paperbit: Paperbit) => void | Promise<void>;
};
declare abstract class PaperbitEventsBase extends GraphicsAPI {
    protected protectedOn: onType;
    on: onType;
    protected abstract paperbit: Paperbit;
    sendEvent(name: PaperbitEvents): Promise<void>;
}
declare abstract class Canvas extends PaperbitEventsBase {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    private resizeObserver;
    private newSize?;
    constructor(container: HTMLElement);
    private resize;
    protected resizeAfterFrame(): void;
}
interface Mouse {
    pos: [number, number];
    left: boolean;
    right: boolean;
    middle: boolean;
    wheel: number;
}
interface MouseDelta {
    pos: [number, number];
    left: number;
    right: number;
    middle: number;
    wheel: number;
}
declare abstract class MouseEvents extends Canvas {
    mouse: Mouse;
    pastMouse: Mouse;
    deltaMouse: MouseDelta;
    constructor(container: HTMLElement);
    private updateMouse;
}
declare abstract class KeyboardEvents extends MouseEvents {
    constructor(container: HTMLElement);
    private updateKey;
}
declare abstract class PaperbitGraphics extends KeyboardEvents {
    graphics: Graphics;
    constructor(container: HTMLElement);
    protected load(): void;
    protected renderFrame(): void;
}
declare type FrameType = {
    count: number;
    time: number;
    deltaTime: number;
    fps: number;
    size: [number, number];
    pixelSize: number;
};
declare abstract class EventLoop extends PaperbitGraphics {
    frame: FrameType;
    private frameTimeOffset;
    constructor(container: HTMLElement);
    private draw;
    private updateFrame;
}
export declare class Paperbit extends EventLoop {
    protected paperbit: Paperbit;
    constructor(container?: HTMLElement);
}
export {};
