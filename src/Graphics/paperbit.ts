import { Graphics } from "./graphics"
import { GraphicsAPI } from "./api/graphicsAPI"

type PaperbitEvents =
	"setup" |
	"draw" |

	"resize" |

	"mouseMove" |
	"mouseDown" |
	"mouseUp" |
	"mouseWheel" |
	"mouse" |

	"keyDown" |
	"keyUp" |
	"keyPress"

type onType = {
	[key in PaperbitEvents]?: (paperbit: Paperbit) => void | Promise<void>;
}

abstract class PaperbitEventsBase extends GraphicsAPI {
	protected protectedOn: onType = {}
	on: onType = {}
	protected abstract paperbit: Paperbit
	sendEvent(name: PaperbitEvents): Promise<void> {
		return new Promise(async resolve => {
			const pa = this.protectedOn[name]?.(this.paperbit)
			const pb = this.on[name]?.(this.paperbit)
			if (pa) await pa
			if (pb) await pb
			resolve()
		})
	}
}

abstract class Canvas extends PaperbitEventsBase {

	container: HTMLElement
	canvas: HTMLCanvasElement
	gl: WebGL2RenderingContext
	private resizeObserver: ResizeObserver
	private newSize?: [number, number]

	constructor(container: HTMLElement) {
		super();
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
	protected resizeAfterFrame() {
		if (this.newSize) {
			this.canvas.width = this.newSize[0]
			this.canvas.height = this.newSize[1]
			this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
			this.sendEvent("resize")
			this.newSize = undefined
		}
	}
}

interface Mouse {
	pos: [number, number]
	left: boolean
	right: boolean
	middle: boolean
	wheel: number
}

interface MouseDelta {
	pos: [number, number]
	left: number
	right: number
	middle: number
	wheel: number
}

abstract class MouseEvents extends Canvas {

	mouse: Mouse
	pastMouse: Mouse
	deltaMouse: MouseDelta

	constructor(container: HTMLElement) {
		super(container)

		this.mouse = { pos: [0, 0], left: false, right: false, middle: false, wheel: 0 }
		this.pastMouse = { pos: [0, 0], left: false, right: false, middle: false, wheel: 0 }
		this.deltaMouse = { pos: [0, 0], left: 0, right: 0, middle: 0, wheel: 0 }

		this.canvas.onmousedown = e => { this.updateMouse(e); this.sendEvent("mouseDown") }
		this.canvas.onmouseup = e => { this.updateMouse(e); this.sendEvent("mouseUp") }
		this.canvas.onmousemove = e => { this.updateMouse(e); this.sendEvent("mouseMove") }
		this.canvas.onwheel = e => { this.updateMouse(e); this.sendEvent("mouseWheel") }
	}

	protected updateMouse(e?: MouseEvent | WheelEvent) {

		if (e) {
			const minDim = Math.min(this.canvas.width, this.canvas.height)
			this.mouse.pos = [(2 * e.clientX - this.canvas.width) / minDim, (this.canvas.height - 2 * e.clientY) / minDim]
			this.mouse.left = (e.buttons & 0b1) != 0
			this.mouse.right = (e.buttons & 0b10) != 0
			this.mouse.middle = (e.buttons & 0b100) != 0
			this.mouse.wheel = this.mouse.wheel + (e instanceof WheelEvent ? e.deltaY / 100 : 0)
		}
		
		this.deltaMouse.pos[0] = this.mouse.pos[0] - this.pastMouse.pos[0]
		this.deltaMouse.pos[1] = this.mouse.pos[1] - this.pastMouse.pos[1]
		this.deltaMouse.left = +this.mouse.left - +this.pastMouse.left
		this.deltaMouse.right = +this.mouse.right - +this.pastMouse.right
		this.deltaMouse.middle = +this.mouse.middle - +this.pastMouse.middle
		this.deltaMouse.wheel = +this.mouse.wheel - +this.pastMouse.wheel
		
		this.pastMouse.pos = this.mouse.pos
		this.pastMouse.left = this.mouse.left
		this.pastMouse.right = this.mouse.right
		this.pastMouse.middle = this.mouse.middle
		this.pastMouse.wheel = this.mouse.wheel

		this.sendEvent("mouse")
	}
}

abstract class KeyboardEvents extends MouseEvents {

	constructor(container: HTMLElement) {
		super(container)

		this.canvas.onkeydown = e => { this.updateKey(e); this.sendEvent("keyDown") }
		this.canvas.onkeyup = e => { this.updateKey(e); this.sendEvent("keyUp") }
	}

	private updateKey(e: KeyboardEvent) {
		if ([...e.key].length === 1 && !e.ctrlKey && !e.metaKey) this.sendEvent("keyPress")
	}
}

abstract class PaperbitGraphics extends KeyboardEvents {

	graphics!: Graphics

	constructor(container: HTMLElement) {
		super(container)
	}

	protected load() {
		this.graphics = new Graphics(this.paperbit)
	}

	protected renderFrame() {
		this.graphics.render(this.createFrame())
	}
}

type FrameType = { count: number, time: number, deltaTime: number, fps: number, size: [number, number], pixelSize: number }

abstract class EventLoop extends PaperbitGraphics {

	frame: FrameType = { count: 0, time: 0, deltaTime: 0, fps: 0, size: [0, 0], pixelSize: 0 }
	private frameTimeOffset = 0

	constructor(container: HTMLElement) {
		super(container)
		requestAnimationFrame(async () => {
			await this.sendEvent("setup")
			this.frameTimeOffset = performance.now() / 1000
			this.draw()
		})
		this.protectedOn.resize = () => {
			this.frame.size[0] = this.canvas.width
			this.frame.size[1] = this.canvas.height
			this.frame.pixelSize = 2 / Math.min(...this.frame.size)
		}
	}

	private async draw() {
		requestAnimationFrame(this.draw.bind(this))

		this.resizeAfterFrame()
		this.updateFrame()
		
		await this.sendEvent("draw")
		
		this.updateMouse()
		this.renderFrame()
	}

	private updateFrame() {
		++this.frame.count
		const now = performance.now() / 1000 - this.frameTimeOffset
		this.frame.deltaTime = now - this.frame.time
		this.frame.fps = 1 / this.frame.deltaTime
		this.frame.time = now
	}
}


export class Paperbit extends EventLoop {

	protected paperbit: Paperbit = this;

	constructor(container: HTMLElement = document.body) {
		super(container)
		this.load()
	}
}

