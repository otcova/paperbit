"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperbitMouse = void 0;
class Mouse {
    constructor() {
        this.pos = [0, 0];
        this.left = 0;
        this.right = 0;
        this.middle = 0;
        this.wheel = 0;
    }
}
;
class PaperbitMouse extends Mouse {
    constructor(bit, sendEvent) {
        super();
        this.past = new Mouse();
        this.delta = new Mouse();
        this.bit = bit;
        this.sendEvent = sendEvent;
        bit.canvas.onmousedown = e => { this.updateMouse(e); this.sendEvent("mouseDown"); };
        bit.canvas.onmouseup = e => { this.updateMouse(e); this.sendEvent("mouseUp"); };
        bit.canvas.onmousemove = e => { this.updateMouse(e); this.sendEvent("mouseMove"); };
        bit.canvas.onwheel = e => { this.updateMouse(e); this.sendEvent("mouseWheel"); };
    }
    updateMouse(e) {
        if (e) {
            const minDim = Math.min(this.bit.canvas.width, this.bit.canvas.height);
            this.pos = [(2 * e.clientX - this.bit.canvas.width) / minDim, (this.bit.canvas.height - 2 * e.clientY) / minDim];
            this.left = e.buttons & 1;
            this.right = (e.buttons >> 1) & 1;
            this.middle = (e.buttons >> 2) & 1;
            this.wheel = this.wheel + (e instanceof WheelEvent ? e.deltaY / 100 : 0);
        }
        this.delta.pos[0] = this.pos[0] - this.past.pos[0];
        this.delta.pos[1] = this.pos[1] - this.past.pos[1];
        this.delta.left = this.left - this.past.left;
        this.delta.right = this.right - this.past.right;
        this.delta.middle = this.middle - this.past.middle;
        this.delta.wheel = this.wheel - this.past.wheel;
        this.past.pos = this.pos;
        this.past.left = this.left;
        this.past.right = this.right;
        this.past.middle = this.middle;
        this.past.wheel = this.wheel;
        this.bit.sendEvent("mouse");
    }
}
exports.PaperbitMouse = PaperbitMouse;
//# sourceMappingURL=mouse.js.map