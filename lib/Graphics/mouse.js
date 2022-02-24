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
    constructor(bit, publishEvent) {
        super();
        this.past = new Mouse();
        this.delta = new Mouse();
        this.bit = bit;
        this.publishEvent = publishEvent;
        bit.graphics.canvas.onmousedown = e => { this.updateMouse(e); this.publishEvent("mouseDown"); };
        bit.graphics.canvas.onmouseup = e => { this.updateMouse(e); this.publishEvent("mouseUp"); };
        bit.graphics.canvas.onmousemove = e => { this.updateMouse(e); this.publishEvent("mouseMove"); };
        bit.graphics.canvas.onwheel = e => { this.updateMouse(e); this.publishEvent("mouseWheel"); };
    }
    updateMouse(e) {
        if (e) {
            const minDim = Math.min(this.bit.graphics.canvas.width, this.bit.graphics.canvas.height);
            this.pos = [(2 * e.clientX - this.bit.graphics.canvas.width) / minDim, (this.bit.graphics.canvas.height - 2 * e.clientY) / minDim];
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
        this.publishEvent("mouse");
    }
}
exports.PaperbitMouse = PaperbitMouse;
//# sourceMappingURL=mouse.js.map