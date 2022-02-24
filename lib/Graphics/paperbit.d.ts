import { canvasEventName, Graphics } from "./graphics";
import { Frame } from "./eventLoop";
import { keyboardEventsNames as keyboardEventName, PaperbitKeyboard } from "./keyboard";
import { mouseEventName, PaperbitMouse } from "./mouse";
import { eventCallback } from "./eventsMng";
import { GraphicsAPI } from "./api/graphicsAPI";
declare type eventLoopName = "setup" | "draw" | "postDraw";
declare type eventName = canvasEventName | eventLoopName | mouseEventName | keyboardEventName;
export declare class Paperbit extends GraphicsAPI {
    protected paperbit: Paperbit;
    graphics: Graphics;
    mouse: PaperbitMouse;
    keyboard: PaperbitKeyboard;
    frame: Frame;
    private publishEvent;
    private eventMng;
    constructor(container?: HTMLElement);
    protected draw(): Promise<void>;
    on(eventName: eventName, callback: eventCallback<Paperbit>): void;
    unsubscribeEvent(eventName: eventName, callback: eventCallback<Paperbit>): void;
}
export {};
