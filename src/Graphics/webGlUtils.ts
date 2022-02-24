const NUMBER_SIZE = 4

function error(msg: string): never {
	throw Error(msg)
}

export class GLVao {
	gl: WebGL2RenderingContext
	id: WebGLVertexArrayObject

	constructor(gl: WebGL2RenderingContext) {
		this.gl = gl
		this.id = gl.createVertexArray() ?? error("Can't create VAO")
	}

	use() {
		this.gl.bindVertexArray(this.id)
		return this
	}
}

type uniformValue = number | [number] | [number, number] | [number, number, number] | [number, number, number, number]

export class GLProgram {
	gl: WebGL2RenderingContext
	id: WebGLProgram
	constructor(gl: WebGL2RenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
		this.gl = gl
		const vertShader = this.#createShader(this.gl.VERTEX_SHADER, vertexShaderSource) ?? error("Can't create vertShader")
		const fragShader = this.#createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource) ?? error("Can't create fragShader")
		this.id = this.#createProgram(vertShader, fragShader) ?? error("Can't create Program")
		this.gl.deleteShader(vertShader)
		this.gl.deleteShader(fragShader)
	}
	delete() {
		this.gl.deleteProgram(this.id)
	}
	#createShader(type: number, source: string) {
		let shaderName = undefined
		if (type == this.gl.VERTEX_SHADER) shaderName = "vertex"
		else if (type == this.gl.FRAGMENT_SHADER) shaderName = "fragment"

		const shader = this.gl.createShader(type) ?? error(`Can't create ${shaderName} shader`)
		this.gl.shaderSource(shader, source)
		this.gl.compileShader(shader)
		if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) return shader

		if (!shaderName) throw Error("> [ERROR] shader type is unknown")
		console.error(`> Error compiling ${shaderName} shader:\n${this.gl.getShaderInfoLog(shader)}`)

		this.gl.deleteShader(shader)
	}
	#createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
		const program = this.gl.createProgram() ?? error(`Can't create shader program`)
		this.gl.attachShader(program, vertexShader)
		this.gl.attachShader(program, fragmentShader)
		this.gl.linkProgram(program)
		if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) return program
		console.error(this.gl.getProgramInfoLog(program))
		this.gl.deleteProgram(program)
	}
	getUniformLoc(name: WebGLUniformLocation | string) {
		if (name instanceof WebGLUniformLocation) return name
		return this.gl.getUniformLocation(this.id, name)
	}
	getAttribLoc(name: number | string) {
		if (typeof name == "number") return name
		return this.gl.getAttribLocation(this.id, name)
	}
	use(uniforms?: [WebGLUniformLocation | string, uniformValue][]) {
		this.gl.useProgram(this.id)
		if (uniforms) this.#loadUniforms(uniforms)
	}
	setUniform(name: WebGLUniformLocation | string, value: uniformValue) {
		this.gl.useProgram(this.id)
		name = this.getUniformLoc(name) ?? error(`Invalid uniform name: '${name}'`)
		if (typeof value == "number") this.gl.uniform1i(name, value)
		else if (value.length == 1) this.gl.uniform1f(name, ...value)
		else if (value.length == 2) this.gl.uniform2f(name, ...value)
		else if (value.length == 3) this.gl.uniform3f(name, ...value)
		else if (value.length == 4) this.gl.uniform4f(name, ...value)
	}
	#loadUniforms(uniforms: [WebGLUniformLocation | string, uniformValue][]) {
		for (const [name, value] of uniforms)
			this.setUniform(this.getUniformLoc(name) ?? error(`Invalid uniform name: '${name}'`), value)
	}
	setMatAttrib(name: number | string, matDimensions: number, stride: number | null = null, offset = 0) {
		stride ||= matDimensions * matDimensions
		name = this.getAttribLoc(name) ?? error(`Invalid attribute name: '${name}'`)
		for (let i = 0; i < matDimensions; ++i) {
			const pos = name + i
			this.gl.enableVertexAttribArray(pos)
			this.gl.vertexAttribPointer(pos, matDimensions, this.gl.FLOAT, false, NUMBER_SIZE * stride, NUMBER_SIZE * (offset + matDimensions * i))
		}
		return {
			divisor: () => {
				for (let i = 0; i < matDimensions; ++i)
					this.gl.vertexAttribDivisor((name as number) + i, 1)
			}
		}
	}
	setAttribs(...attribs: [string | number, number, "i"?][]) {
		if (attribs.length % 2 != 0) throw `Invalid attributes: ${attribs}`
		let stride = 0
		for (let i = 0; i < attribs.length; ++i)
			stride += attribs[i][1]
		for (let i = 0, offset = 0; i < attribs.length; ++i) {
			this.setVecAttrib(attribs[i][0], attribs[i][1], stride, offset, attribs[i][2])
			offset += attribs[i][1]
		}
	}
	private setVecAttrib(name: number | string, vecDimensions: number, stride: number | null = null, offset = 0, type: "f" | "i" = "f") {
		stride ||= vecDimensions
		let locationIndex = this.getAttribLoc(name)
		if (locationIndex == -1) return console.warn(locationIndex == name ? `[setVecAttrib] location: ${name}` : `[setVecAttrib] location: "${name}" doesn't exist`)
		this.gl.enableVertexAttribArray(locationIndex)
		if (type == "f") {
			this.gl.vertexAttribPointer(
				locationIndex, vecDimensions,
				type === "f" ? this.gl.FLOAT : this.gl.INT,
				false, stride * NUMBER_SIZE, offset * NUMBER_SIZE,
			)
		} else {
			this.gl.vertexAttribIPointer(
				locationIndex, vecDimensions,
				this.gl.INT,
				stride * NUMBER_SIZE, offset * NUMBER_SIZE,
			)
		}
		return { divisor: () => this.gl.vertexAttribDivisor(locationIndex, 1) }
	}
}

export class GLBuffer {

	gl: WebGL2RenderingContext
	dynamic: boolean
	id: WebGLBuffer

	glReservedSize = 0
	size = 0

	constructor(gl: WebGL2RenderingContext, dynamic = true) {
		this.gl = gl
		this.dynamic = dynamic
		this.id = gl.createBuffer() ?? error("Can't create buffer")
	}
	bind() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id)
	}
	update(buffer: Float32Array | ArrayBuffer | SharedArrayBuffer, size?: number) {
		this.size = size || (buffer.byteLength / Float32Array.BYTES_PER_ELEMENT)
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id)
		if (this.glReservedSize < this.size) this.#resize(buffer)
		else this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(buffer, 0, this.size))
	}
	#resize(buffer: Float32Array | ArrayBuffer | SharedArrayBuffer) {
		this.glReservedSize = buffer.byteLength / Float32Array.BYTES_PER_ELEMENT
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(buffer), this.dynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW)
	}
}

interface GLTextureConfigInterface {
	mipmap?: boolean
	minFilter?: "linear" | "nearest"
	magFilter?: "linear" | "nearest"
	wrapX?: "clamp" | "repeat" | "mirror"
	wrapY?: "clamp" | "repeat" | "mirror"
}

abstract class GLTextureConfig implements GLTextureConfigInterface {

	protected abstract gl: WebGL2RenderingContext

	mipmap: boolean = true
	minFilter: "linear" | "nearest" = "linear"
	magFilter: "linear" | "nearest" = "linear"
	wrapX: "clamp" | "repeat" | "mirror" = "clamp"
	wrapY: "clamp" | "repeat" | "mirror" = "clamp"

	constructor(data: GLTextureConfigInterface = {}) {
		if (data.mipmap) this.mipmap = data.mipmap
		if (data.minFilter) this.minFilter = data.minFilter
		if (data.magFilter) this.magFilter = data.magFilter
		if (data.wrapX) this.wrapX = data.wrapX
		if (data.wrapY) this.wrapY = data.wrapY
	}

	protected setConfig() {
		if (this.mipmap) this.gl.generateMipmap(this.gl.TEXTURE_2D)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.glWrap(this.wrapX))
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.glWrap(this.wrapY))
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.glMinFilter(this.minFilter))
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.glMagFilter(this.magFilter))
	}

	private glWrap(type: "clamp" | "repeat" | "mirror") {
		return type === "clamp" ? this.gl.CLAMP_TO_EDGE : type === "repeat" ? this.gl.REPEAT : this.gl.MIRRORED_REPEAT
	}
	private glMinFilter(type: "linear" | "nearest") {
		if (!this.mipmap) return this.glMagFilter(type)
		return type === "linear" ? this.gl.LINEAR_MIPMAP_LINEAR : this.gl.NEAREST_MIPMAP_NEAREST
	}
	private glMagFilter(type: "linear" | "nearest") {
		return type === "linear" ? this.gl.LINEAR : this.gl.NEAREST
	}
}

export class GLTexture extends GLTextureConfig {

	protected gl: WebGL2RenderingContext
	private id: WebGLTexture
	private loadPromise: Promise<void>
	size: [number, number] = [0, 0]
	slot: number

	constructor(gl: WebGL2RenderingContext, slot: number = 0, url: string, config: GLTextureConfigInterface = {}) {
		super(config)
		this.gl = gl
		this.slot = slot
		this.id = gl.createTexture() ?? error("Can't create texture")

		this.use()
		this.setDefaultImage()

		this.loadPromise = new Promise<void>(resolve => {
			if (!url) return resolve()
			const image = new Image()
			image.onload = () => {
				this.size = [image.width, image.height]
				this.use()
				gl.texImage2D(gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image)
				this.setConfig()
				resolve()
			}
			image.src = url
		})
	}

	async onLoad(callback?: (texture: GLTexture) => {}) {
		await this.loadPromise
		callback?.(this)
	}

	use() {
		this.gl.activeTexture(this.gl.TEXTURE0 + this.slot)
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.id)
	}

	private setDefaultImage() {
		const defaultTexture = new Uint8Array([0, 0, 255, 255, 255, 0, 255, 255, 0, 0, 255, 255, 255, 0, 255, 255, 0, 0, 255, 255, 255, 0, 255, 255, 0, 0, 255, 255, 255, 0, 255, 255, 0, 0, 255, 255])  // default texture
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 3, 3, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, defaultTexture)
	}
}