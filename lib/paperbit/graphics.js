import { GLBuffer, GLProgram, GLTexture } from "./webGl";
export class Graphics {
    constructor(paperbit) {
        this.glTextures = [];
        this.paperbit = paperbit;
        this.glProgram = new GLProgram(this.paperbit.gl, shaders[0], shaders[1]);
        this.glBuffer = new GLBuffer(this.paperbit.gl);
        this.paperbit.gl.enable(this.paperbit.gl.BLEND);
        // this.paperbit.gl.blendFuncSeparate(this.paperbit.gl.SRC_ALPHA, this.paperbit.gl.ONE_MINUS_SRC_ALPHA, this.paperbit.gl.ZERO, this.paperbit.gl.ONE);
        this.paperbit.gl.blendFuncSeparate(this.paperbit.gl.SRC_ALPHA, this.paperbit.gl.ONE_MINUS_SRC_ALPHA, this.paperbit.gl.ONE, this.paperbit.gl.ONE);
        for (let i = 0; i < 8; ++i)
            this.glProgram.setUniform(`sampler${i}`, i);
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
    async loadTexture(url, type = "rgba") {
        const tex = new GLTexture(this.paperbit.gl, this.glTextures.length, url);
        this.glTextures.push(tex);
        await tex.onLoad();
        return { slot: tex.slot + 2, size: tex.size, type: "rgba" };
    }
}
const shaders = [`#version 300 es

in vec3 pos;
in vec2 texCoord;
in vec4 color;
in float texId;

out float pixelSize;
out vec2 _texCoord;
out float _texId;
out vec4 _color;
out float radius;

uniform vec2 screenSize;

void main() {
	pixelSize = 2. / min(screenSize.x, screenSize.y);
	vec2 ratio = screenSize.x < screenSize.y? vec2(1, screenSize.x / screenSize.y) : vec2(screenSize.y / screenSize.x, 1);
	vec2 halfScreenSize = screenSize / vec2(2);
	vec2 pixelPerfectTranslation = (halfScreenSize - ceil(halfScreenSize)) / vec2(min(halfScreenSize.x, halfScreenSize.y));
	gl_Position = vec4(pos.xy * ratio + pixelPerfectTranslation, 0, 1);
	_texId = texId;
	_color = color;
	_texCoord = texCoord;
	radius = abs(texCoord.x);
}`, `#version 300 es

precision highp float;

in float pixelSize;
in float radius;
in vec2 _texCoord;
in float _texId;
in vec4 _color;

out vec4 color;

uniform sampler2D sampler0;
uniform sampler2D sampler1;
uniform sampler2D sampler2;
uniform sampler2D sampler3;
uniform sampler2D sampler4;
uniform sampler2D sampler5;
uniform sampler2D sampler6;
uniform sampler2D sampler7;

void main() {
	switch (int(_texId)) {
		case 0:
			color = _color;
			break;
		case 1:
			color = vec4(_color.rgb, smoothstep(0., pixelSize, radius - length(_texCoord)) * clamp(_color.a, 0., 1.));
			break;
		case 2:
			color = vec4(_color.xyz, _color.a * texture(sampler0, _texCoord).x);
			break;
		case 3:
			color = texture(sampler1, _texCoord) * _color;
			break;
		case 4:
			color = texture(sampler2, _texCoord) * _color;
			break;
		case 5:
			color = texture(sampler3, _texCoord) * _color;
			break;
		case 6:
			color = texture(sampler4, _texCoord) * _color;
			break;
		case 7:
			color = texture(sampler5, _texCoord) * _color;
			break;
		case 8:
			color = texture(sampler6, _texCoord) * _color;
			break;
		case 9:
			color = texture(sampler7, _texCoord) * _color;
			break;
	}
}`];
//# sourceMappingURL=graphics.js.map