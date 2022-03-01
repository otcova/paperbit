"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperbitMouse = void 0;
class PaperbitMouse {
    constructor(canvas) {
        this.pos = [0, 0];
        this.left = 0;
        this.right = 0;
        this.middle = 0;
        this.wheel = 0;
        this.offsetLeft = 0;
        this.offsetMiddle = 0;
        this.offsetRight = 0;
        this.canvas = canvas;
        document.addEventListener("mousedown", e => this.updateButtons(e));
        document.addEventListener("mouseup", e => this.updateButtons(e));
        document.addEventListener("mousemove", e => this.updateMouse(e));
        this.canvas.onwheel = e => this.updateWheel(e);
    }
    updateMouse(e) {
        const minDim = Math.min(this.canvas.width, this.canvas.height);
        const rect = this.canvas.getBoundingClientRect();
        this.pos = [
            (2 * (e.clientX - rect.left) - this.canvas.width) / minDim,
            (this.canvas.height - 2 * (e.clientY - rect.top)) / minDim
        ];
        if (((e.buttons & 1) == 0) != (this.left % 2 == 0))
            ++this.left;
        if (((e.buttons & 2) == 0) != (this.right % 2 == 0))
            ++this.right;
        if (((e.buttons & 4) == 0) != (this.middle % 2 == 0))
            ++this.middle;
    }
    updateButtons(e) {
        if ((((e.buttons & 1) == 0) != (this.left % 2 == 0)) && e.button == 0)
            this.left += 1;
        else if ((((e.buttons & 4) == 0) != (this.left % 2 == 0)) && e.button == 1)
            this.middle += 1;
        else if ((((e.buttons & 2) == 0) != (this.left % 2 == 0)) && e.button == 2)
            this.right += 1;
    }
    updateWheel(e) {
        this.updateMouse(e);
        this.wheel = this.wheel + (e instanceof WheelEvent ? e.deltaY / 100 : 0);
    }
    pullData() {
        let data = {
            pos: this.pos,
            wheel: this.wheel,
            left: this.left - this.offsetLeft,
            middle: this.middle - this.offsetMiddle,
            right: this.right - this.offsetRight,
        };
        this.offsetLeft = this.left;
        this.middle = this.middle;
        this.right = this.right;
        return data;
    }
}
exports.PaperbitMouse = PaperbitMouse;
//# sourceMappingURL=mouse.js.map