"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paperbit = void 0;
const graphics_1 = require("./graphics");
const eventLoop_1 = require("./eventLoop");
const keyboard_1 = require("./keyboard");
const mouse_1 = require("./mouse");
const eventsMng_1 = require("./eventsMng");
const graphicsAPI_1 = require("./api/graphicsAPI");
class Paperbit extends graphicsAPI_1.GraphicsAPI {
    constructor(container = document.body) {
        super();
        this.paperbit = this;
        this.eventMng = new eventsMng_1.EventMng();
        this.publishEvent = (name) => this.eventMng.publish(name, this);
        this.graphics = new graphics_1.Graphics(this.paperbit, this.publishEvent, container);
        this.mouse = new mouse_1.PaperbitMouse(this, this.publishEvent);
        this.keyboard = new keyboard_1.PaperbitKeyboard(this, this.publishEvent);
        this.frame = new eventLoop_1.Frame(this.paperbit);
        setTimeout(() => this.publishEvent("setup").then(this.draw.bind(this)), 0);
    }
    async draw() {
        await this.publishEvent("draw");
        await this.publishEvent("postDraw");
        requestAnimationFrame(this.draw.bind(this));
    }
    on(eventName, callback) {
        this.eventMng.subscribe(eventName, callback);
    }
    unsubscribeEvent(eventName, callback) {
        this.eventMng.unsubscribe(eventName, callback);
    }
}
exports.Paperbit = Paperbit;
//# sourceMappingURL=paperbit.js.map