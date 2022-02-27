"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mouse = void 0;
class MouseState {
    constructor() {
        this.pos = [0, 0];
        this.left = 0;
        this.right = 0;
        this.middle = 0;
        this.wheel = 0;
    }
}
class Mouse extends MouseState {
    constructor(beforeFrame) {
        super();
        this.delta = new MouseState();
        this.past = new MouseState();
        this.pastMouseData = { left: 0, right: 0, middle: 0 };
        beforeFrame((frameData) => {
            var _a, _b;
            this.past.pos = this.pos;
            this.pos = frameData.mouse.pos;
            this.delta.pos[0] = this.pos[0] - this.past.pos[0];
            this.delta.pos[1] = this.pos[1] - this.past.pos[1];
            if (this.delta.pos[0] != 0 || this.delta.pos[1] != 0)
                (_a = this.onMove) === null || _a === void 0 ? void 0 : _a.call(this, this);
            this.past.wheel = this.wheel;
            this.wheel = frameData.mouse.wheel;
            this.delta.wheel = this.wheel - this.past.wheel;
            if (this.delta.wheel != 0)
                (_b = this.onWheel) === null || _b === void 0 ? void 0 : _b.call(this, this);
            this.useMouseButtonData("left", frameData);
            this.useMouseButtonData("right", frameData);
            this.useMouseButtonData("middle", frameData);
        });
    }
    useMouseButtonData(type, frameData) {
        var _a, _b, _c, _d;
        if (frameData.mouse[type] == 0) {
            this.past[type] = this[type];
            this.delta[type] = this[type] - this.past[type];
            if (this.delta[type] == -1)
                (_a = this.onUp) === null || _a === void 0 ? void 0 : _a.call(this, this);
            else if (this.delta[type] == 1)
                (_b = this.onDown) === null || _b === void 0 ? void 0 : _b.call(this, this);
        }
        else
            while (frameData.mouse[type] > 0) {
                --frameData.mouse[type];
                ++this.pastMouseData[type];
                this.past[type] = this[type];
                this[type] = this.pastMouseData[type] % 2 == 0 ? 0 : 1;
                this.delta[type] = this[type] - this.past[type];
                if (this.delta[type] == -1)
                    (_c = this.onUp) === null || _c === void 0 ? void 0 : _c.call(this, this);
                else if (this.delta[type] == 1)
                    (_d = this.onDown) === null || _d === void 0 ? void 0 : _d.call(this, this);
            }
    }
}
exports.Mouse = Mouse;
//# sourceMappingURL=mouse.js.map