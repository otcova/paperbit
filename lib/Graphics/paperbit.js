"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paperbit = void 0;
const graphics_1 = require("./graphics");
const keyboard_1 = require("./keyboard");
const mouse_1 = require("./mouse");
const graphicsAPI_1 = require("./api/graphicsAPI");
class Paperbit {
    constructor(container = document.body, doFrame) {
        this.paperbit = this;
        if (doFrame)
            this.doFrame = doFrame;
        else
            this.api = new graphicsAPI_1.GraphicsAPI(f => this.doFrame = f);
        this.graphics = new graphics_1.Graphics(container);
        this.mouse = new mouse_1.PaperbitMouse(this.graphics.canvas);
        this.keyboard = new keyboard_1.PaperbitKeyboard(this.graphics.canvas);
        setTimeout(this.draw.bind(this), 0);
    }
    async draw() {
        this.graphics.render(await this.doFrame({
            canvasSize: this.graphics.resize(),
            mouse: this.mouse.pullData(),
            keyboard: this.keyboard.pullData(),
        }));
        requestAnimationFrame(this.draw.bind(this));
    }
}
exports.Paperbit = Paperbit;
// {
// 	const bit = new Paperbit(document.body)
// 	const { mouse, ellipse } = bit.api
// 	bit.api.onDraw = () => {
// 		ellipse(...mouse.pos, .1)
// 	}
// }
// {
// 	let doFrame!: (frameData: StartFrameData) => ResultFrameData
// 	const api = new GraphicsAPI(f => doFrame = f)
// 	const bit = new Paperbit(document.body, doFrame)
// 	const { mouse, ellipse } = api
// 	api.onDraw = () => {
// 		ellipse(...mouse.pos, .1)
// 	}
// }
// {
// 	{
// 		let doFrame: (frameData: StartFrameData) => ResultFrameData
// 		const api = new GraphicsAPI((f) => doFrame = f)
// 		onmessage = (event) => {
// 			if (event.data.type == "doFrame") doFrame(event.data.frameData)
// 		}
// 	}
// 	{
// 		let framePromise: (data: ResultFrameData) => void
// 		const bit = new Paperbit(document.body, frameData => {
// 			postMessage({
// 				type: "doFrame",
// 				frameData: frameData
// 			})
// 			return new Promise<ResultFrameData>(r => framePromise = r)
// 		})
// 		onmessage = (event) => {
// 			if (event.data.type == "frameResult") framePromise(event.data.frameData)
// 		}
// 	}
// }
//# sourceMappingURL=paperbit.js.map