import { PaperbitEventsBase } from "./eventsMng";
export declare abstract class Canvas extends PaperbitEventsBase {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    private resizeObserver;
    private newSize?;
    constructor(container: HTMLElement);
    private resize;
    protected resizeAfterFrame(): void;
}
