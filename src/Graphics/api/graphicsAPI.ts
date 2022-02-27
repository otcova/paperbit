import { MouseData, ResultFrameData, StartFrameData } from "../interfaces"
import { Frame } from "./frame"
import { GraphicsFunctions } from "./graphicsFunctions"
import { Keyboard } from "./keyboard"
import { Mouse } from "./mouse"

export type beforeFrameCallback = (data: StartFrameData) => void
export type afterFrameCallback = () => void

export class GraphicsAPI extends GraphicsFunctions {
	
	frame: Frame
	mouse: Mouse
	keyboard: Keyboard
	
	onStart?: (api: GraphicsAPI) => Promise<void> | void
	onDraw?: (api: GraphicsAPI) => void
	
	private beforeFrameCallbacks: beforeFrameCallback[] = []
	
	constructor(onStartFrame: (callback: (frameData: StartFrameData) => Promise<ResultFrameData>) => void) {
		super()
		
		const beforeFrame = (callback: beforeFrameCallback) => this.beforeFrameCallbacks.push(callback)
		
		this.frame = new Frame(beforeFrame)
		this.mouse = new Mouse(beforeFrame)
		this.keyboard = new Keyboard(beforeFrame)
		
		onStartFrame(this.doFrame.bind(this))
	}

	private async doFrame(frameData: StartFrameData): Promise<ResultFrameData> {
		if (this.frame.count == 0) await this.onStart?.(this)

		for (const callback of this.beforeFrameCallbacks) callback(frameData)		
		this.state.scope(() => this.onDraw?.(this))
		
		this.state.reset()
		return {
			verticesCount: this.buffer.size / 10,
			buffer: this.buffer.clear()
		}
	}
	
}

