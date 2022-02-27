export declare abstract class Canvas {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    constructor(container: HTMLElement);
    resize(): [number, number];
}
