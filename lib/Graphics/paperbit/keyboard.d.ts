import { Paperbit } from "./paperbit";
export declare type keyboardEventsNames = "keyPress" | "keyDown" | "keyUp";
export declare class PaperbitKeyboard {
    private sendEvent;
    constructor(bit: Paperbit, sendEvent: (name: keyboardEventsNames) => void);
    private updateKey;
}
