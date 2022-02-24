"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graphics = void 0;
const font_1 = require("../../font");
const webGl_1 = require("./webGl");
class Graphics {
    constructor(paperbit) {
        this.glTextures = [];
        this.paperbit = paperbit;
        this.glProgram = new webGl_1.GLProgram(this.paperbit.gl, shaders[0], shaders[1]);
        this.glBuffer = new webGl_1.GLBuffer(this.paperbit.gl);
        this.paperbit.gl.enable(this.paperbit.gl.BLEND);
        // this.paperbit.gl.blendFuncSeparate(this.paperbit.gl.SRC_ALPHA, this.paperbit.gl.ONE_MINUS_SRC_ALPHA, this.paperbit.gl.ZERO, this.paperbit.gl.ONE);
        this.paperbit.gl.blendFuncSeparate(this.paperbit.gl.SRC_ALPHA, this.paperbit.gl.ONE_MINUS_SRC_ALPHA, this.paperbit.gl.ONE, this.paperbit.gl.ONE);
        for (let i = 0; i < 8; ++i)
            this.glProgram.setUniform(`sampler[${i}]`, i);
    }
    render(frame) {
        this.paperbit.gl.clearColor(1, 1, 1, 1);
        this.paperbit.gl.clear(this.paperbit.gl.COLOR_BUFFER_BIT);
        this.glProgram.use();
        this.glBuffer.update(frame.buffer);
        this.glProgram.setUniform("screenSize", this.paperbit.frame.size);
        this.glProgram.setAttribs(["pos", 3], ["texCoord", 2], ["color", 4], ["texId", 1]);
        this.paperbit.gl.drawArrays(this.paperbit.gl.TRIANGLES, 0, frame.verticesCount);
    }
    async loadTexture(url) {
        const tex = new webGl_1.GLTexture(this.paperbit.gl, this.glTextures.length, url);
        this.glTextures.push(tex);
        await tex.onLoad();
        return { slot: tex.slot, size: tex.size };
    }
    async loadFont(urlBitmap, urlFnt) {
        return Object.assign({ atlas: await (0, font_1.loadFNT)(urlFnt) }, await this.loadTexture(urlBitmap));
    }
}
exports.Graphics = Graphics;
const shaders = [`#version 300 es

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
}`];
//# sourceMappingURL=graphics.js.map