import { vec, matrix } from "../../vec"
import { Frame } from "./frame"
import { PushBuffer, setColor } from "./innerUtils"
import { GraphicsStateStack } from "./state"

export abstract class GraphicsFunctions {
	
	abstract frame: Frame
	state = new GraphicsStateStack()
	protected buffer: PushBuffer = new PushBuffer()

	constructor() {
		this.triangle = this.triangle.bind(this)
		this.ellipse = this.ellipse.bind(this)
		this.rect = this.rect.bind(this)
		this.triangleStrip = this.triangleStrip.bind(this)
		this.background = this.background.bind(this)
		this.line = this.line.bind(this)

		this.text = this.text.bind(this)
		this.textWidth = this.textWidth.bind(this)
	}

	triangleStrip(vertices: [number, number][] | [number, number, number][] | number[][]) {
		for (let i = 2; i < vertices.length; ++i) {
			this.triangle(vertices[i], vertices[i - 1], vertices[i - 2])
		}
	}

	background(...color: number[]): void {
		const [r, g, b, a] = setColor([0, 0, 0, 0], color)

		const va = [-this.frame.size[0], -this.frame.size[1]]
		const vb = [this.frame.size[0], -this.frame.size[1]]
		const vc = [-this.frame.size[0], this.frame.size[1]]
		const vd = [this.frame.size[0], this.frame.size[1]]

		this.buffer.push([ // x, y, z, tx, ty, r, g, b, a, i
			vb[0], vb[1], 0, 0, 0, r, g, b, a, 0,
			vd[0], vd[1], 0, 0, 0, r, g, b, a, 0,
			vc[0], vc[1], 0, 0, 0, r, g, b, a, 0,
			vc[0], vc[1], 0, 0, 0, r, g, b, a, 0,
			va[0], va[1], 0, 0, 0, r, g, b, a, 0,
			vb[0], vb[1], 0, 0, 0, r, g, b, a, 0,
		])
	}

	triangle(a: number[], b: number[], c: number[]): void
	triangle(a: [number, number], b: [number, number], c: [number, number]): void
	triangle(a: [number, number, number], b: [number, number, number], c: [number, number, number]): void
	triangle(a: number[], b: number[], c: number[]) {

		a = matrix.dot(this.state.matrix, 4, [a[0], a[1], a[2] ?? 0])
		b = matrix.dot(this.state.matrix, 4, [b[0], b[1], b[2] ?? 0])
		c = matrix.dot(this.state.matrix, 4, [c[0], c[1], c[2] ?? 0])

		this.buffer.push([ // x, y, z, tx, ty, r, g, b, a, i
			a[0], a[1], a[2], 0, 0, ...this.state.color, 0,
			b[0], b[1], b[2], 0, 0, ...this.state.color, 0,
			c[0], c[1], c[2], 0, 0, ...this.state.color, 0,
		])
	}

	ellipse(x: number, y: number, diameter: number): void
	ellipse(x: number, y: number, width: number, height?: number): void
	ellipse(x: number, y: number, width: number, height?: number) {
		height ||= width

		width /= 2
		height /= 2

		const x0 = x - width
		const y0 = y - height
		const x1 = x + width
		const y1 = y + height

		const a = matrix.dot(this.state.matrix, 4, [x0, y0, 0])
		const b = matrix.dot(this.state.matrix, 4, [x1, y0, 0])
		const c = matrix.dot(this.state.matrix, 4, [x0, y1, 0])
		const d = matrix.dot(this.state.matrix, 4, [x1, y1, 0])

		const textureID = this.genTextureClass("ellipse")

		this.buffer.push([ // x, y, z, tx, ty, r, g, b, a, i
			b[0], b[1], b[2], -height, height, ...this.state.color, textureID,
			d[0], d[1], d[2], -height, -height, ...this.state.color, textureID,
			c[0], c[1], c[2], height, -height, ...this.state.color, textureID,
			c[0], c[1], c[2], height, -height, ...this.state.color, textureID,
			a[0], a[1], a[2], height, height, ...this.state.color, textureID,
			b[0], b[1], b[2], -height, height, ...this.state.color, textureID,
		])
	}

	rect(x: number, y: number, size: number): void
	rect(x: number, y: number, width: number, height?: number): void
	rect(x: number, y: number, width: number, height?: number) {
		height ??= width

		width /= 2
		height /= 2

		const origin = this.state.rectOrigin

		const x0 = x - width - origin[0] * width
		const y0 = y - height - origin[1] * height
		const x1 = x + width - origin[0] * width
		const y1 = y + height - origin[1] * height

		const va = matrix.dot(this.state.matrix, 4, [x0, y0, 0])
		const vb = matrix.dot(this.state.matrix, 4, [x1, y0, 0])
		const vc = matrix.dot(this.state.matrix, 4, [x0, y1, 0])
		const vd = matrix.dot(this.state.matrix, 4, [x1, y1, 0])

		const uv = this.state.rectUV
		const [r, g, b, a] = this.state.color
		const textureID = this.genTextureClass("rect")

		let uva = [uv[0], uv[3]]
		let uvb = [uv[2], uv[3]]
		let uvc = [uv[0], uv[1]]
		let uvd = [uv[2], uv[1]]
		if (uv.length == 8) {
			uva = [uv[0], uv[7]]
			uvb = [uv[2], uv[5]]
			uvc = [uv[4], uv[3]]
			uvd = [uv[6], uv[1]]
		}

		this.buffer.push([ // x, y, z, tx, ty, r, g, b, a, i
			vb[0], vb[1], vb[2], uvb[0], uvb[1], r, g, b, a, textureID,
			vd[0], vd[1], vd[2], uvd[0], uvd[1], r, g, b, a, textureID,
			vc[0], vc[1], vc[2], uvc[0], uvc[1], r, g, b, a, textureID,
			vc[0], vc[1], vc[2], uvc[0], uvc[1], r, g, b, a, textureID,
			va[0], va[1], va[2], uva[0], uva[1], r, g, b, a, textureID,
			vb[0], vb[1], vb[2], uvb[0], uvb[1], r, g, b, a, textureID,
		])
	}

	line(vertices: [number, number][], close: boolean = false) {
		for (let i = 1; i < vertices.length; ++i)
			this.segment(vertices[i - 2], vertices[i - 1], vertices[i], vertices[i + 1])
		if (close && vertices.length > 2)
			this.segment(vertices[vertices.length - 2], vertices[vertices.length - 1], vertices[0], vertices[1])
	}

	private segment(past: [number, number, number] | [number, number] | undefined, a: [number, number, number] | [number, number], b: [number, number, number] | [number, number], next: [number, number, number] | [number, number] | undefined) {
		const u = vec.resize(vec.sub(b, a), this.state.lineWidth / 2)
		const v = [u[1], -u[0]]

		const upA = vec.add(a, v)
		const downA = vec.sub(a, v)
		const upB = vec.add(b, v)
		const downB = vec.sub(b, v)

		// const upA = vec.add(a, v, u)
		// const downA = vec.add(vec.sub(a, v), u)
		// const upB = vec.sub(vec.add(b, v), u)
		// const downB = vec.sub(b, v, u)

		const quadA = matrix.dot(this.state.matrix, 4, [upA[0], upA[1], upA[2] ?? 0])
		const quadB = matrix.dot(this.state.matrix, 4, [downA[0], downA[1], downA[2] ?? 0])
		const quadC = matrix.dot(this.state.matrix, 4, [upB[0], upB[1], upB[2] ?? 0])
		const quadD = matrix.dot(this.state.matrix, 4, [downB[0], downB[1], downB[2] ?? 0])

		this.buffer.push([ // x, y, z, tx, ty, r, g, b, a, i
			quadB[0], quadB[1], quadB[2], -1, 1, ...this.state.color, 0,
			quadD[0], quadD[1], quadD[2], -1, -1, ...this.state.color, 0,
			quadC[0], quadC[1], quadC[2], 1, -1, ...this.state.color, 0,
			quadC[0], quadC[1], quadC[2], 1, -1, ...this.state.color, 0,
			quadA[0], quadA[1], quadA[2], 1, 1, ...this.state.color, 0,
			quadB[0], quadB[1], quadB[2], -1, 1, ...this.state.color, 0,
		])
	}

	text(text: string, x: number, y: number, scale = .2) {
		this.state.scope(() => {
			const w = this.textWidth(text) * scale
			const h = scale

			x -= (w + this.state.textOrigin[0] * w) / 2
			if (this.state.textOrigin[1] == 1) y -= h / 2
			else if (this.state.textOrigin[1] == -1) y -= h * (1-200/256)
			
			this.state.textureColorBlend = "*r"
			for (let i = 0; i < text.length; ++i) {
				this.drawChar(text[i], x + this.textWidth(text.substring(0, i), text[i]) * scale, y, scale)
			}
		})
	}

	textWidth(text: string, nextChar?: string) {
		const font = this.state.font
		if (font == null) throw Error("state.font = null")
		let width = 0
		for (const char of text) width += font.atlas.map.get(char)?.advance ?? 0
		if (nextChar) width += font.atlas.map.get(text[text.length - 1])?.kerning.get(nextChar) ?? 0
		return width
	}

	private drawChar(char: string, x: number, y: number, size: number) {
		if (!this.state.font) throw Error("state.font = null")

		const charData = this.state.font.atlas.map.get(char)
		if (!charData) throw Error(`Char '${char[0]}' of code '${char[0].charCodeAt(0)}' is not in the font`)

		const h = size * charData.height
		this.state.rectUV = [...charData.a, ...charData.b]
		this.state.rectOrigin = [-1, 1]
		this.state.texture = this.state.font

		this.rect(
			x + size * charData.offset[0],
			y - size * charData.offset[1] + .5 * size,
			h * (charData.b[0] - charData.a[0]) / (charData.b[1] - charData.a[1]),
			h
		)
	}

	private genTextureClass(type: "rect" | "ellipse") {
		const tex = this.state.texture
		let texClass = type == "rect" ? 0 : 1 << 31
		if (tex) {
			switch (this.state.textureColorBlend) {
				case "+":
					texClass |= 1 << 29
					break
				case "*":
					texClass |= 2 << 29
					break
				case "*r":
					texClass |= 3 << 29
					break
			}
			texClass |= tex.slot << 24
		}
		return texClass
	}
}