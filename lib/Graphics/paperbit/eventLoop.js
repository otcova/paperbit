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
        this.size[0] = bit.canvas.width;
        this.size[1] = bit.canvas.height;
        this.pixelSize = 2 / Math.min(...this.size);
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
// export class EventLoop extends Frame {
// 	private bit
// 	private sendEvent
// 	constructor(bit: Paperbit, sendEvent: (name: paperbitEventsLoopNames) => void) {
// 		super()
// 		this.bit = bit
// 		this.sendEvent = sendEvent
// 		requestAnimationFrame(async () => {
// 			await this.sendEvent("setup")
// 			this.draw()
// 		})
// 		// this.protectedOn.resize = () => {
// 		// 	this.size[0] = this.canvas.width
// 		// 	this.size[1] = this.canvas.height
// 		// 	this.pixelSize = 2 / Math.min(...this.size)
// 		// }
// 	}
// 	private async draw() {
// 		requestAnimationFrame(this.draw.bind(this))
// 		// this.resizeAfterFrame()
// 		// this.updateFrame()
// 		await this.sendEvent("draw")
// 		// this.updateMouse()
// 		// this.renderFrame()
// 		// this.graphics.render(this.createFrame())
// 	}
// }
//# sourceMappingURL=eventLoop.js.map