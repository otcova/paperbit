import { Paperbit } from "./paperbit";
export declare type keyboardEventsNames = "keyPress" | "keyDown" | "keyUp";
export declare class PaperbitKeyboard {
    private publishEvent;
    constructor(bit: Paperbit, publishEvent: (name: keyboardEventsNames) => void);
    private updateKey;
}
