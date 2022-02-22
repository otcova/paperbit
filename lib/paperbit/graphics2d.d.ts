export declare class Graphics2d {
    constructor();
    rect(x: number, y: number, size: number): void;
    rect(x: number, y: number, width: number, height: number): void;
    ellipse(x: number, y: number, diameter: number): void;
    ellipse(x: number, y: number, width: number, height: number): void;
    rotateDegrees(angle: number): void;
    rotateRadians(angle: number): void;
    translate(x: number, y: number): void;
    scale(factor: number): void;
    scale(x: number, y: number): void;
}
