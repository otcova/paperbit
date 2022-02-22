export declare class Paperbit {
    onSetup?: () => void;
    onDraw?: () => void;
    graphics: (Graphics2d | Graphics3d)[];
    constructor();
    pushGraphics(graphic: Graphics2d): Graphics2d;
}
export declare class Graphics2d {
    constructor();
    rect(x: number, y: number, size: number): void;
    rect(x: number, y: number, width: number, height: number): void;
    translate(x: number, y: number): void;
}
export declare class Graphics3d {
}
