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
    }
    resize() {
        const newSizeW = this.canvas.offsetWidth;
        const newSizeH = this.canvas.offsetHeight;
        if (this.canvas.width != this.canvas.offsetWidth || this.canvas.height != this.canvas.offsetHeight) {
            this.canvas.width = newSizeW;
            this.canvas.height = newSizeH;
            this.gl.viewport(0, 0, newSizeW, newSizeH);
        }
        return [newSizeW, newSizeH];
    }
}
exports.Canvas = Canvas;
//# sourceMappingURL=canvas.js.map