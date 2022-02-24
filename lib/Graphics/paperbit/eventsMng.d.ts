import { GraphicsAPI } from "../api/graphicsAPI";
import { mouseEventsNames } from "./mouse";
import { Paperbit } from "./paperbit";
declare type eventsNames = "setup" | "draw" | "resize" | mouseEventsNames | "keyDown" | "keyUp" | "keyPress";
declare type eventCallback = (paperbit: Paperbit) => void | Promise<void>;
declare type eventCallbacks = {
    [key in eventsNames]?: eventCallback[];
};
export declare abstract class PaperbitEventsBase extends GraphicsAPI {
    protected eventCallbacks: eventCallbacks;
    protected abstract paperbit: Paperbit;
    sendEvent(name: eventsNames): Promise<void>;
    on(name: eventsNames, callback: eventCallback): void;
}
export {};
