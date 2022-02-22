import { FontAtlas } from "../../font"
import { vec, matrix, Tuple } from "../../vec"
import { setColor } from "./innerUtils"

type Origin = [0, 0] | [0, 1] | [0, -1] | [1, 0] | [1, 1] | [1, -1] | [-1, 0] | [-1, 1] | [-1, -1]

interface TextureType {
	slot: number
}

interface FontType extends TextureType {
	atlas: FontAtlas
}

class GraphicsState {
	matrix: number[]
	color: Tuple<number, 4>

	lineColor: Tuple<number, 4>
	lineWidth: number
	lineCap: "round" | "square" | "butt"
	lineJoin: "round" | "miter" | "bevel" | "none"

	font: FontType | null

	texture: TextureType | null
	textureColorBlend: "+" | "*" | "*r" // color + textureColor | color * textureColor | color * textureColor.red

	rectUV: Tuple<number, 4 | 8>
	rectOrigin: Origin
	
	textOrigin: Origin

	constructor(copy?: GraphicsState) {
		if (copy) {
			this.matrix = [...copy.matrix]
			this.color = [...copy.color]

			this.lineColor = [...copy.lineColor]
			this.lineWidth = copy.lineWidth
			this.lineCap = copy.lineCap
			this.lineJoin = copy.lineJoin

			this.font = copy.font
			this.texture = copy.texture
			this.textureColorBlend = copy.textureColorBlend

			this.rectOrigin = [...copy.rectOrigin]
			this.rectUV = [...copy.rectUV]
			
			this.textOrigin = [...copy.textOrigin]
		} else {
			this.matrix = matrix.new([4, 4])
			this.color = [0.3, 0.3, 0.3, 1]

			this.lineColor = [0, 0, 0, 1]
			this.lineWidth = .1
			this.lineCap = "round"
			this.lineJoin = "round"

			this.font = null
			this.texture = null
			this.textureColorBlend = "*"

			this.rectOrigin = [0, 0]
			this.rectUV = [0, 0, 1, 1]
			
			this.textOrigin = [0, 0]
		}
	}
}

export class GraphicsStateStack {

	private stateStack = [new GraphicsState()]

	set color(c: number[] | number) { setColor(this.current.color, c) }
	get color(): [number, number, number, number] { return this.current.color }
	
	set colorHex(c: number[] | number) { setColor(this.current.color, vec.div(c, 255)) }
	get colorHex(): [number, number, number, number] { return vec.mult(this.current.color, 255) }
	
	set colorAlpha(alpha: number) { this.current.color[3] = alpha }
	get colorAlpha(): number { return this.current.color[3] }

	set lineColor(c: number[] | number) { setColor(this.current.lineColor, c) }
	get lineColor() { return this.current.lineColor }

	set lineWidth(width: number) { this.current.lineWidth = width }
	get lineWidth() { return this.current.lineWidth }

	set lineCap(type: "round" | "square" | "butt") { this.current.lineCap = type }
	get lineCap() { return this.current.lineCap }

	set lineJoin(type: "round" | "miter" | "bevel" | "none") { this.current.lineJoin = type }
	get lineJoin() { return this.current.lineJoin }

	set font(font: null | FontType) { this.current.font = font }
	get font(): null | FontType { return this.current.font }

	set texture(tex: null | TextureType) { this.current.texture = tex }
	get texture(): null | TextureType { return this.current.texture }

	set textureColorBlend(algorithm: "+" | "*" | "*r") { this.current.textureColorBlend = algorithm }
	get textureColorBlend(): "+" | "*" | "*r" { return this.current.textureColorBlend }

	set rectUV(uv: Tuple<number, 4 | 8>) { this.current.rectUV = uv }
	get rectUV() { return this.current.rectUV }

	set rectOrigin(origin: Origin) { this.current.rectOrigin = origin }
	get rectOrigin() { return this.current.rectOrigin }

	set matrix(mat: number[]) { this.current.matrix = mat }
	get matrix() { return this.current.matrix }
	
	set textOrigin(origin: Origin) { this.current.textOrigin = origin }
	get textOrigin() { return this.current.textOrigin }

	rotateX(angle: number) {
		const c = Math.cos(angle)
		const s = Math.sin(angle)
		this.current.matrix = matrix.dot(this.current.matrix, 4, [
			1, 0, 0, 0,
			0, c, s, 0,
			0, -s, c, 0,
			0, 0, 0, 1,
		], 4)
	}
	rotateY(angle: number) {
		const c = Math.cos(angle)
		const s = Math.sin(angle)
		this.current.matrix = matrix.dot(this.current.matrix, 4, [
			c, 0, -s, 0,
			0, 1, 0, 0,
			s, 0, c, 0,
			0, 0, 0, 1,
		], 4)
	}
	rotateZ(angle: number) {
		const c = Math.cos(angle)
		const s = Math.sin(angle)
		this.current.matrix = matrix.dot(this.current.matrix, 4, [
			c, -s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		], 4)
	}

	rotate(angle: number, axis?: [number, number, number]) {
		const c = Math.cos(angle)
		const s = Math.sin(angle)
		if (!axis) {
			this.current.matrix = matrix.dot(this.current.matrix, 4, [
				c, -s, 0, 0,
				s, c, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1,
			], 4)
		} else {
			const t = 1 - c
			const [x, y, z] = vec.normalize(axis)
			this.current.matrix = matrix.dot(this.current.matrix, 4, [
				t * x * x + c, t * x * y + z * s, t * x * z - y * s, 0,
				t * x * y - z * s, t * y * y + c, t * y * z + x * s, 0,
				t * x * z + y * s, t * y * z - x * s, t * z * z + c, 0,
				0, 0, 0, 1,
			], 4)
		}
	}

	scale(xy: number): void
	scale(x: number, y: number): void
	scale(x: number, y: number, z: number): void
	scale(x: number, y?: number, z?: number) {
		this.current.matrix = matrix.dot(this.current.matrix, 4, [x, 0, 0, 0, 0, y ?? x, 0, 0, 0, 0, z ?? (y ? 1 : x), 0, 0, 0, 0, 1], 4)
	}

	translate(x: number, y: number): void
	translate(x: number, y: number, z: number): void
	translate(x: number, y: number, z: number = 0) {
		this.current.matrix = matrix.dot(this.current.matrix, 4, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1], 4)
	}

	push() { this.stateStack.push(new GraphicsState(this.current)) }
	pop() { this.stateStack.pop() }

	private get current() { return this.stateStack[this.stateStack.length - 1] }
	reset() { this.stateStack = [new GraphicsState()] }
}