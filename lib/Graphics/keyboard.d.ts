import { KeyboardData } from "./interfaces";
export declare class PaperbitKeyboard implements KeyboardData {
    keys: Map<string, number>;
    typed: string;
    constructor(cavnas: HTMLCanvasElement);
    private updateKey;
    pullData(): KeyboardData;
}
