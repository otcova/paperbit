"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = void 0;
const vec_1 = require("../../vec");
class Frame {
    constructor(beforeFrame) {
        this.count = 0;
        this.time = 0;
        this.deltaTime = 0;
        this.fps = 0;
        this.size = [0, 0];
        this.pixelSize = 0;
        this.pastTime = 0;
        beforeFrame(this.updateAfterDraw.bind(this));
    }
    updateOnResize(frameData) {
        this.pixelSize = 2 / Math.min(...frameData.canvasSize);
        this.size[0] = .5 * frameData.canvasSize[0] * this.pixelSize;
        this.size[1] = .5 * frameData.canvasSize[1] * this.pixelSize;
    }
    updateAfterDraw(frameData) {
        ++this.count;
        this.time = performance.now() / 1000;
        this.deltaTime = this.time - this.pastTime;
        this.fps = 1 / this.deltaTime;
        this.pastTime = this.time;
        if (!vec_1.vec.equal(this.size, frameData.canvasSize))
            this.updateOnResize(frameData);
    }
}
exports.Frame = Frame;
//# sourceMappingURL=frame.js.map