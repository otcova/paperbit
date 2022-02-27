import { StartFrameData } from "../interfaces";
import { beforeFrameCallback } from "./graphicsAPI";

class MouseState {
	pos: [number, number] = [0, 0]
	left = 0
	right = 0
	middle = 0
	wheel = 0
}

export class Mouse extends MouseState {

	delta = new MouseState()
	past = new MouseState()
	
	onMove?: (mouse: Mouse) => void
	onWheel?: (mouse: Mouse) => void
	onDown?: (mouse: Mouse) => void
	onUp?: (mouse: Mouse) => void
	
	private pastMouseData = {left: 0, right: 0, middle: 0}
	
	constructor(beforeFrame: (callback: beforeFrameCallback) => void) {
		super()

		beforeFrame((frameData: StartFrameData) => {
			this.past.pos = this.pos
			this.pos = frameData.mouse.pos
			this.delta.pos[0] = this.pos[0] - this.past.pos[0]
			this.delta.pos[1] = this.pos[1] - this.past.pos[1]
			if (this.delta.pos[0] != 0 || this.delta.pos[1] != 0) this.onMove?.(this)
			
			this.past.wheel = this.wheel
			this.wheel = frameData.mouse.wheel
			this.delta.wheel = this.wheel - this.past.wheel
			if (this.delta.wheel != 0) this.onWheel?.(this)
			
			this.useMouseButtonData("left", frameData)
			this.useMouseButtonData("right", frameData)
			this.useMouseButtonData("middle", frameData)
		})
	}
	
	private useMouseButtonData(type: "left" | "right" | "middle", frameData: StartFrameData) {
		if (frameData.mouse[type] == 0) {
			this.past[type] = this[type]
			this.delta[type] = this[type] - this.past[type]
			
			if (this.delta[type] == -1) this.onUp?.(this)
			else if (this.delta[type] == 1) this.onDown?.(this)
			
		} else while (frameData.mouse[type] > 0) {
			--frameData.mouse[type]
			++this.pastMouseData[type]
			
			this.past[type] = this[type]
			this[type] = this.pastMouseData[type] % 2 == 0? 0 : 1
			this.delta[type] = this[type] - this.past[type]
			
			if (this.delta[type] == -1) this.onUp?.(this)
			else if (this.delta[type] == 1) this.onDown?.(this)
		}
	}
}