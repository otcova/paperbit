import { vec } from "../../vec"
import { StartFrameData } from "../interfaces"
import { beforeFrameCallback } from "./graphicsAPI"

export class Frame {
	count = 0
	time = 0
	deltaTime = 0
	fps = 0
	size: [number, number] = [0, 0]
	pixelSize = 0
	
	private pastTime = 0
	
	constructor(beforeFrame: (callback: beforeFrameCallback) => void) {
		beforeFrame(this.updateAfterDraw.bind(this))
	}
	
	private updateOnResize(frameData: StartFrameData) {
		this.pixelSize = 2 / Math.min(...frameData.canvasSize)
		this.size[0] = .5 * frameData.canvasSize[0] * this.pixelSize
		this.size[1] = .5 * frameData.canvasSize[1] * this.pixelSize
	}
	
	private updateAfterDraw(frameData: StartFrameData) {
		++this.count
		this.time = performance.now() / 1000
		this.deltaTime = this.time - this.pastTime
		this.fps = 1 / this.deltaTime
		this.pastTime = this.time
		
		if (!vec.equal(this.size, frameData.canvasSize))
			this.updateOnResize(frameData)
	}
}