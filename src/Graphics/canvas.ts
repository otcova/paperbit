import { GraphicsAPI } from "./api/graphicsAPI"

export abstract class Canvas {

	container: HTMLElement
	canvas: HTMLCanvasElement
	gl: WebGL2RenderingContext
	
	constructor(container: HTMLElement) {
		this.canvas = document.createElement("canvas")
		this.canvas.style.width = "100%"
		this.canvas.style.height = "100%"

		this.container = container
		this.container.appendChild(this.canvas)

		const gl = this.canvas.getContext("webgl2")
		if (!gl) throw Error("Can't create webgl2 context")
		this.gl = gl
	}
	
	resize(): [number, number] {
		const newSizeW = this.canvas.offsetWidth
		const newSizeH = this.canvas.offsetHeight
		if (this.canvas.width != this.canvas.offsetWidth || this.canvas.height != this.canvas.offsetHeight) {
			this.canvas.width = newSizeW
			this.canvas.height = newSizeH
			this.gl.viewport(0, 0, newSizeW, newSizeH)
		}
		return [newSizeW, newSizeH]
	}
}