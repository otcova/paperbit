"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paperbit = void 0;
const graphics_1 = require("./graphics");
const eventLoop_1 = require("./eventLoop");
const keyboard_1 = require("./keyboard");
const mouse_1 = require("./mouse");
const canvas_1 = require("./canvas");
class Paperbit extends canvas_1.Canvas {
    constructor(container = document.body) {
        super(container);
        this.paperbit = this;
        this.graphics = new graphics_1.Graphics(this.paperbit);
        this.mouse = new mouse_1.PaperbitMouse(this, this.sendEvent.bind(this));
        this.keyboard = new keyboard_1.PaperbitKeyboard(this, this.sendEvent.bind(this));
        this.frame = new eventLoop_1.Frame(this.paperbit);
        setTimeout(() => this.sendEvent("setup").then(this.draw.bind(this)), 0);
    }
    async draw() {
        this.resizeAfterFrame();
        await this.sendEvent("draw");
        this.graphics.render(this.createFrame());
        requestAnimationFrame(this.draw.bind(this));
    }
}
exports.Paperbit = Paperbit;
//# sourceMappingURL=paperbit.js.map