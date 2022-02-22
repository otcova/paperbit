"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paperbit = void 0;
const graphics_1 = require("./graphics");
const graphicsAPI_1 = require("./api/graphicsAPI");
class PaperbitEventsBase extends graphicsAPI_1.GraphicsAPI {
    constructor() {
        super(...arguments);
        this.protectedOn = {};
        this.on = {};
    }
    sendEvent(name) {
        return new Promise(async (resolve) => {
            var _a, _b, _c, _d;
            const pa = (_b = (_a = this.protectedOn)[name]) === null || _b === void 0 ? void 0 : _b.call(_a, this.paperbit);
            const pb = (_d = (_c = this.on)[name]) === null || _d === void 0 ? void 0 : _d.call(_c, this.paperbit);
            if (pa)
                await pa;
            if (pb)
                await pb;
            resolve();
        });
    }
}
class Canvas extends PaperbitEventsBase {
    constructor(container) {
        super();
        this.canvas = document.createElement("canvas");
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.container = container;
        this.container.appendChild(this.canvas);
        const gl = this.canvas.getContext("webgl2");
        if (!gl)
            throw Error("Can't create webgl2 context");
        this.gl = gl;
        this.resizeObserver = new ResizeObserver(this.resize.bind(this));
        this.resizeObserver.observe(this.canvas);
    }
    resize(entries) {
        this.newSize = [entries[0].contentRect.width, entries[0].contentRect.height];
    }
    resizeAfterFrame() {
        if (this.newSize) {
            this.canvas.width = this.newSize[0];
            this.canvas.height = this.newSize[1];
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.sendEvent("resize");
            this.newSize = undefined;
        }
    }
}
class MouseEvents extends Canvas {
    constructor(container) {
        super(container);
        this.mouse = { pos: [0, 0], left: false, right: false, middle: false, wheel: 0 };
        this.pastMouse = { pos: [0, 0], left: false, right: false, middle: false, wheel: 0 };
        this.deltaMouse = { pos: [0, 0], left: 0, right: 0, middle: 0, wheel: 0 };
        this.canvas.onmousedown = e => { this.updateMouse(e); this.sendEvent("mouseDown"); };
        this.canvas.onmouseup = e => { this.updateMouse(e); this.sendEvent("mouseUp"); };
        this.canvas.onmousemove = e => { this.updateMouse(e); this.sendEvent("mouseMove"); };
        this.canvas.onwheel = e => { this.updateMouse(e); this.sendEvent("mouseWheel"); };
    }
    updateMouse(e) {
        if (e) {
            const minDim = Math.min(this.canvas.width, this.canvas.height);
            this.mouse.pos = [(2 * e.clientX - this.canvas.width) / minDim, (this.canvas.height - 2 * e.clientY) / minDim];
            this.mouse.left = (e.buttons & 0b1) != 0;
            this.mouse.right = (e.buttons & 0b10) != 0;
            this.mouse.middle = (e.buttons & 0b100) != 0;
            this.mouse.wheel = this.mouse.wheel + (e instanceof WheelEvent ? e.deltaY / 100 : 0);
        }
        this.deltaMouse.pos[0] = this.mouse.pos[0] - this.pastMouse.pos[0];
        this.deltaMouse.pos[1] = this.mouse.pos[1] - this.pastMouse.pos[1];
        this.deltaMouse.left = +this.mouse.left - +this.pastMouse.left;
        this.deltaMouse.right = +this.mouse.right - +this.pastMouse.right;
        this.deltaMouse.middle = +this.mouse.middle - +this.pastMouse.middle;
        this.deltaMouse.wheel = +this.mouse.wheel - +this.pastMouse.wheel;
        this.pastMouse.pos = this.mouse.pos;
        this.pastMouse.left = this.mouse.left;
        this.pastMouse.right = this.mouse.right;
        this.pastMouse.middle = this.mouse.middle;
        this.pastMouse.wheel = this.mouse.wheel;
        this.sendEvent("mouse");
    }
}
class KeyboardEvents extends MouseEvents {
    constructor(container) {
        super(container);
        this.canvas.onkeydown = e => { this.updateKey(e); this.sendEvent("keyDown"); };
        this.canvas.onkeyup = e => { this.updateKey(e); this.sendEvent("keyUp"); };
    }
    updateKey(e) {
        if ([...e.key].length === 1 && !e.ctrlKey && !e.metaKey)
            this.sendEvent("keyPress");
    }
}
class PaperbitGraphics extends KeyboardEvents {
    constructor(container) {
        super(container);
    }
    load() {
        this.graphics = new graphics_1.Graphics(this.paperbit);
    }
    renderFrame() {
        this.graphics.render(this.createFrame());
    }
}
class EventLoop extends PaperbitGraphics {
    constructor(container) {
        super(container);
        this.frame = { count: 0, time: 0, deltaTime: 0, fps: 0, size: [0, 0], pixelSize: 0 };
        this.frameTimeOffset = 0;
        requestAnimationFrame(async () => {
            await this.sendEvent("setup");
            this.frameTimeOffset = performance.now() / 1000;
            this.draw();
        });
        this.protectedOn.resize = () => {
            this.frame.size[0] = this.canvas.width;
            this.frame.size[1] = this.canvas.height;
            this.frame.pixelSize = 2 / Math.min(...this.frame.size);
        };
    }
    async draw() {
        requestAnimationFrame(this.draw.bind(this));
        this.resizeAfterFrame();
        this.updateFrame();
        await this.sendEvent("draw");
        this.updateMouse();
        this.renderFrame();
    }
    updateFrame() {
        ++this.frame.count;
        const now = performance.now() / 1000 - this.frameTimeOffset;
        this.frame.deltaTime = now - this.frame.time;
        this.frame.fps = 1 / this.frame.deltaTime;
        this.frame.time = now;
    }
}
class Paperbit extends EventLoop {
    constructor(container = document.body) {
        super(container);
        this.paperbit = this;
        this.load();
    }
}
exports.Paperbit = Paperbit;
//# sourceMappingURL=paperbit.js.map