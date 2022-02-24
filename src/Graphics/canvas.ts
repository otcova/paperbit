import { GraphicsAPI } from "./api/graphicsAPI"

export abstract class Canvas {

	container: HTMLElement
	canvas: HTMLCanvasElement
	gl: WebGL2RenderingContext
	private resizeObserver: ResizeObserver
	private newSize?: [number, number]
	
	protected onResize?: () => void
	
	constructor(container: HTMLElement) {
		this.canvas = document.createElement("canvas")
		this.canvas.style.width = "100%"
		this.canvas.style.height = "100%"

		this.container = container
		this.container.appendChild(this.canvas)

		const gl = this.canvas.getContext("webgl2")
		if (!gl) throw Error("Can't create webgl2 context")
		this.gl = gl

		this.resizeObserver = new ResizeObserver(this.resize.bind(this))
		this.resizeObserver.observe(this.canvas)
	}

	private resize(entries: ResizeObserverEntry[]) {
		this.newSize = [entries[0].contentRect.width, entries[0].contentRect.height]
	}
	
	protected checkResize() {
		if (this.newSize) {
			this.canvas.width = this.newSize[0]
			this.canvas.height = this.newSize[1]
			this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
			this.newSize = undefined
			this.onResize?.()
		}
	}
}