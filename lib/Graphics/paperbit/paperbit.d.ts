import { Graphics } from "./graphics";
import { Frame } from "./eventLoop";
import { PaperbitKeyboard } from "./keyboard";
import { PaperbitMouse } from "./mouse";
import { Canvas } from "./canvas";
export declare class Paperbit extends Canvas {
    protected paperbit: Paperbit;
    graphics: Graphics;
    mouse: PaperbitMouse;
    keyboard: PaperbitKeyboard;
    frame: Frame;
    constructor(container?: HTMLElement);
    protected draw(): Promise<void>;
}
