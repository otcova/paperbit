"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = void 0;
class Frame {
    constructor(bit) {
        this.count = 0;
        this.time = 0;
        this.deltaTime = 0;
        this.fps = 0;
        this.size = [0, 0];
        this.pixelSize = 0;
        this.pastTime = 0;
        bit.on("resize", this.updateOnResize.bind(this));
        bit.on("draw", this.updateAfterDraw.bind(this));
    }
    updateOnResize(bit) {
        this.pixelSize = 2 / Math.min(bit.graphics.canvas.width, bit.graphics.canvas.height);
        this.size[0] = .5 * bit.graphics.canvas.width * this.pixelSize;
        this.size[1] = .5 * bit.graphics.canvas.height * this.pixelSize;
    }
    updateAfterDraw() {
        ++this.count;
        this.time = performance.now() / 1000;
        this.deltaTime = this.time - this.pastTime;
        this.fps = 1 / this.deltaTime;
        this.pastTime = this.time;
    }
}
exports.Frame = Frame;
//# sourceMappingURL=frame.js.map