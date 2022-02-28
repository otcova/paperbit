import { MouseData } from "./interfaces"

export class PaperbitMouse implements MouseData {

	pos: [number, number] = [0, 0]
	left = 0
	right = 0
	middle = 0
	wheel = 0
	
	private offsetLeft = 0
	private offsetMiddle = 0
	private offsetRight = 0
	
	private canvas: HTMLCanvasElement
	
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		document.addEventListener("mousedown", e => this.updateButtons(e))
		document.addEventListener("mouseup", e => this.updateButtons(e))
		document.addEventListener("mousemove", e => this.updateMouse(e))
		this.canvas.onwheel = e => this.updateWheel(e)
	}

	protected updateMouse(e: {clientX: number, clientY: number, buttons: number}) {
		const minDim = Math.min(this.canvas.width, this.canvas.height)
		this.pos = [
			(2 * (e.clientX - this.canvas.offsetLeft + window.scrollX) - this.canvas.width) / minDim, 
			(this.canvas.height - 2 * (e.clientY - this.canvas.offsetTop + window.scrollY)) / minDim
		]
		
		if (((e.buttons & 1) == 0) != (this.left % 2 == 0)) ++this.left
		if (((e.buttons & 2) == 0) != (this.right % 2 == 0)) ++this.right
		if (((e.buttons & 4) == 0) != (this.middle % 2 == 0)) ++this.middle
	}
	
	private updateButtons(e: MouseEvent) {
		if ((((e.buttons & 1) == 0) != (this.left % 2 == 0)) && e.button == 0) this.left += 1
		else if((((e.buttons & 4) == 0) != (this.left % 2 == 0)) && e.button == 1) this.middle += 1
		else if ((((e.buttons & 2) == 0) != (this.left % 2 == 0)) && e.button == 2) this.right += 1
	}
	
	private updateWheel(e: WheelEvent) {
		this.updateMouse(e)
		this.wheel = this.wheel + (e instanceof WheelEvent ? e.deltaY / 100 : 0)		
	}
	
	pullData(): MouseData {
		let data = {
			pos: this.pos,
			wheel: this.wheel,
			left: this.left - this.offsetLeft,
			middle: this.middle - this.offsetMiddle,
			right: this.right - this.offsetRight,
		}
		this.offsetLeft = this.left
		this.middle = this.middle
		this.right = this.right
		return data
	}
}