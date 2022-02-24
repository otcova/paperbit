import { Canvas } from "./canvas"
import { Paperbit } from "./paperbit"

export class Frame {
	count = 0
	time = 0
	deltaTime = 0
	fps = 0
	size: [number, number] = [0, 0]
	pixelSize = 0
	
	private pastTime = 0
	
	constructor(bit: Paperbit) {
		bit.on("resize", this.updateOnResize.bind(this))
		bit.on("draw", this.updateAfterDraw.bind(this))
	}
	
	private updateOnResize(bit: Paperbit) {
		this.size[0] = bit.graphics.canvas.width
		this.size[1] = bit.graphics.canvas.height
		this.pixelSize = 2 / Math.min(...this.size)
	}
	
	private updateAfterDraw() {
		++this.count
		this.time = performance.now() / 1000
		this.deltaTime = this.time - this.pastTime
		this.fps = 1 / this.deltaTime
		
		this.pastTime = this.time
	}
}