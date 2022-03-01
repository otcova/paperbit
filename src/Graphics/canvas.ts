import { PaperbitAPI } from "./api/graphicsAPI"

export abstract class Canvas {

	container: HTMLElement
	canvas: HTMLCanvasElement
	gl: WebGL2RenderingContext
	
	constructor(container: HTMLElement) {
		this.canvas = document.createElement("canvas")
		this.canvas.style.position = "absolute"
		this.canvas.style.width = "100%"
		this.canvas.style.height = "100%"
		
		this.container = container
		this.container.appendChild(this.canvas)

		const gl = this.canvas.getContext("webgl2")
		if (!gl) throw Error("Can't create webgl2 context")
		this.gl = gl
	}
	
	resize(): [number, number] {
		const newSizeW = this.container.offsetWidth
		const newSizeH = this.container.offsetHeight
		if (this.canvas.width != newSizeW || this.canvas.height != newSizeH) {
			this.canvas.style.width = newSizeW + "px"
			this.canvas.style.height = newSizeH + "px"
			this.canvas.width = newSizeW
			this.canvas.height = newSizeH
			this.gl.viewport(0, 0, newSizeW, newSizeH)
		}
		return [newSizeW, newSizeH]
	}
}