import { FontAtlas, loadFNT } from "./../font"
import { FrameData } from "./api/graphicsAPI"
import { Canvas } from "./canvas"
import { Paperbit } from "./paperbit"
import { GLBuffer, GLProgram, GLTexture } from "./webGlUtils"

export type canvasEventName = "resize" 

interface Texture {
	size: [number, number]
	slot: number
}

interface Font extends Texture {
	atlas: FontAtlas
}

export class Graphics extends Canvas {

	bit: Paperbit

	protected glProgram: GLProgram
	protected glBuffer: GLBuffer
	protected glTextures: GLTexture[] = []

	constructor(bit: Paperbit, publishEvent: (name: canvasEventName) => void, container: HTMLElement) {
		super(container)
		this.bit = bit
		this.onResize = () => publishEvent("resize")
		this.bit.on("draw", this.checkResize.bind(this))
		this.bit.on("postDraw", () => this.render(bit.createFrame()))

		this.glProgram = new GLProgram(this.gl, shaders[0], shaders[1])
		this.glBuffer = new GLBuffer(this.gl)
		this.gl.enable(this.gl.BLEND);
		// this.paperbit.gl.blendFuncSeparate(this.paperbit.gl.SRC_ALPHA, this.paperbit.gl.ONE_MINUS_SRC_ALPHA, this.paperbit.gl.ZERO, this.paperbit.gl.ONE);
		this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE);
		
		for (let i = 0; i < 8; ++i)
			this.glProgram.setUniform(`sampler[${i}]`, i)
	}

	render(frame: FrameData) {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT)

		this.glProgram.use()
		this.glBuffer.update(frame.buffer)
		this.glProgram.setUniform("screenSize", this.bit.frame.size)
		this.glProgram.setAttribs(["pos", 3], ["texCoord", 2], ["color", 4], ["texId", 1])
		this.gl.drawArrays(this.gl.TRIANGLES, 0, frame.verticesCount)
	}

	async loadTexture(url: string): Promise<Texture> {
		const tex = new GLTexture(this.gl, this.glTextures.length, url)
		this.glTextures.push(tex)
		await tex.onLoad()
		return { slot: tex.slot, size: tex.size }
	}

	async loadFont(urlBitmap: string, urlFnt: string): Promise<Font> {
		return { atlas: await loadFNT(urlFnt), ...await this.loadTexture(urlBitmap) }
	}
}

const shaders: [string, string] = [`#version 300 es

in vec3 pos;
in vec2 texCoord;
in vec4 color;
in float texId;

out float pixelSize;
out vec2 _texCoord;
flat out int _texId;
out vec4 _color;
out float radius;

uniform vec2 screenSize;

void main() {
	pixelSize = 2. / min(screenSize.x, screenSize.y);
	vec2 ratio = screenSize.x < screenSize.y? vec2(1, screenSize.x / screenSize.y) : vec2(screenSize.y / screenSize.x, 1);
	vec2 halfScreenSize = screenSize / vec2(2);
	vec2 pixelPerfectTranslation = (halfScreenSize - ceil(halfScreenSize)) / vec2(min(halfScreenSize.x, halfScreenSize.y));
	gl_Position = vec4(pos.xy * ratio + pixelPerfectTranslation, 0, 1);
	_texId = int(texId);
	_color = color;
	_texCoord = texCoord;
	radius = abs(texCoord.x);
}`, `#version 300 es

precision highp float;

in float pixelSize;
in float radius;
in vec2 _texCoord;
flat in int _texId;
in vec4 _color;

out vec4 color;

uniform sampler2D sampler[8];

vec4 getTextureColor() {
	switch ((_texId & 0x1F000000)>> 24 ) {
		case 0: return texture(sampler[0], _texCoord);
		case 1: return texture(sampler[1], _texCoord);
		case 2: return texture(sampler[2], _texCoord);
		case 3: return texture(sampler[3], _texCoord);
		case 4: return texture(sampler[4], _texCoord);
		case 5: return texture(sampler[5], _texCoord);
		case 6: return texture(sampler[6], _texCoord);
		case 7: return texture(sampler[7], _texCoord);
		default: return vec4(1,1,1,1);
	}
}

void main() {
	
	switch ((_texId >> 29) & 0x3) {
		case 0:
			color = _color;
			break;
		case 1:
			color = _color + getTextureColor();
			break;
		case 2:
			color = _color * getTextureColor();
			break;
		case 3:
			color = vec4(_color.rgb, _color.a * getTextureColor().r);
			break;
	}
	bool isRect = (_texId & 0x80000000)  == 0;
	if (isRect) return;
	color = vec4(_color.rgb, smoothstep(0., pixelSize, radius - length(_texCoord)) * clamp(_color.a, 0., 1.));
}`]