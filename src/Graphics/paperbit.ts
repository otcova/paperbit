import { Graphics } from "./graphics";
import { PaperbitKeyboard } from "./keyboard";
import { PaperbitMouse } from "./mouse";
import { PaperbitAPI as PaperbitAPI } from "./api/graphicsAPI";
import { ResultFrameData, StartFrameData } from "./interfaces";


export class PaperbitCanvas {

	protected paperbit: PaperbitCanvas = this;

	api!: PaperbitAPI
	private doFrame!: (frameData: StartFrameData) => Promise<ResultFrameData> | ResultFrameData

	graphics: Graphics
	private mouse: PaperbitMouse
	private keyboard: PaperbitKeyboard

	constructor(container: HTMLElement = document.body, doFrame?: (frameData: StartFrameData) => Promise<ResultFrameData> | ResultFrameData) {
		if (doFrame) this.doFrame = doFrame
		else this.api = new PaperbitAPI(f => this.doFrame = f)
		
		this.graphics = new Graphics(container)
		this.mouse = new PaperbitMouse(this.graphics.canvas)
		this.keyboard = new PaperbitKeyboard(this.graphics.canvas)
		
		setTimeout(this.draw.bind(this), 0)
	}

	protected async draw() {
		this.graphics.render(await this.doFrame({
			canvasSize: this.graphics.resize(),
			mouse: this.mouse.pullData(),
			keyboard: this.keyboard.pullData(),
		}))
		requestAnimationFrame(this.draw.bind(this))
	}
}

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