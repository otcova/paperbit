export declare abstract class Canvas {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    private resizeObserver;
    private newSize?;
    protected onResize?: () => void;
    constructor(container: HTMLElement);
    private resize;
    protected checkResize(): void;
}
