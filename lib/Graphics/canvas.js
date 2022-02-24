"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
class Canvas {
    constructor(container) {
        this.canvas = document.createElement("canvas");
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.container = container;
        this.container.appendChild(this.canvas);
        const gl = this.canvas.getContext("webgl2");
        if (!gl)
            throw Error("Can't create webgl2 context");
        this.gl = gl;
        this.resizeObserver = new ResizeObserver(this.resize.bind(this));
        this.resizeObserver.observe(this.canvas);
    }
    resize(entries) {
        this.newSize = [entries[0].contentRect.width, entries[0].contentRect.height];
    }
    checkResize() {
        var _a;
        if (this.newSize) {
            this.canvas.width = this.newSize[0];
            this.canvas.height = this.newSize[1];
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.newSize = undefined;
            (_a = this.onResize) === null || _a === void 0 ? void 0 : _a.call(this);
        }
    }
}
exports.Canvas = Canvas;
//# sourceMappingURL=canvas.js.map