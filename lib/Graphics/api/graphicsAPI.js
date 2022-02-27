"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphicsAPI = void 0;
const frame_1 = require("./frame");
const graphicsFunctions_1 = require("./graphicsFunctions");
const keyboard_1 = require("./keyboard");
const mouse_1 = require("./mouse");
class GraphicsAPI extends graphicsFunctions_1.GraphicsFunctions {
    constructor(onStartFrame) {
        super();
        this.beforeFrameCallbacks = [];
        const beforeFrame = (callback) => this.beforeFrameCallbacks.push(callback);
        this.frame = new frame_1.Frame(beforeFrame);
        this.mouse = new mouse_1.Mouse(beforeFrame);
        this.keyboard = new keyboard_1.Keyboard(beforeFrame);
        onStartFrame(this.doFrame.bind(this));
    }
    async doFrame(frameData) {
        var _a;
        if (this.frame.count == 0)
            await ((_a = this.onStart) === null || _a === void 0 ? void 0 : _a.call(this, this));
        for (const callback of this.beforeFrameCallbacks)
            callback(frameData);
        this.state.scope(() => { var _a; return (_a = this.onDraw) === null || _a === void 0 ? void 0 : _a.call(this, this); });
        this.state.reset();
        return {
            verticesCount: this.buffer.size / 10,
            buffer: this.buffer.clear()
        };
    }
}
exports.GraphicsAPI = GraphicsAPI;
//# sourceMappingURL=graphicsAPI.js.map