var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _GLProgram_instances, _GLProgram_createShader, _GLProgram_createProgram, _GLProgram_loadUniforms, _GLBuffer_instances, _GLBuffer_resize;
const FLOAT_SIZE = 4;
function error(msg) {
    throw Error(msg);
}
export class GLVao {
    constructor(gl) {
        var _a;
        this.gl = gl;
        this.id = (_a = gl.createVertexArray()) !== null && _a !== void 0 ? _a : error("Can't create VAO");
    }
    use() {
        this.gl.bindVertexArray(this.id);
        return this;
    }
}
export class GLProgram {
    constructor(gl, vertexShaderSource, fragmentShaderSource) {
        var _a, _b, _c;
        _GLProgram_instances.add(this);
        this.gl = gl;
        const vertShader = (_a = __classPrivateFieldGet(this, _GLProgram_instances, "m", _GLProgram_createShader).call(this, this.gl.VERTEX_SHADER, vertexShaderSource)) !== null && _a !== void 0 ? _a : error("Can't create vertShader");
        const fragShader = (_b = __classPrivateFieldGet(this, _GLProgram_instances, "m", _GLProgram_createShader).call(this, this.gl.FRAGMENT_SHADER, fragmentShaderSource)) !== null && _b !== void 0 ? _b : error("Can't create fragShader");
        this.id = (_c = __classPrivateFieldGet(this, _GLProgram_instances, "m", _GLProgram_createProgram).call(this, vertShader, fragShader)) !== null && _c !== void 0 ? _c : error("Can't create Program");
        this.gl.deleteShader(vertShader);
        this.gl.deleteShader(fragShader);
    }
    delete() {
        this.gl.deleteProgram(this.id);
    }
    getUniformLoc(name) {
        if (name instanceof WebGLUniformLocation)
            return name;
        return this.gl.getUniformLocation(this.id, name);
    }
    getAttribLoc(name) {
        if (typeof name == "number")
            return name;
        return this.gl.getAttribLocation(this.id, name);
    }
    use(uniforms) {
        this.gl.useProgram(this.id);
        if (uniforms)
            __classPrivateFieldGet(this, _GLProgram_instances, "m", _GLProgram_loadUniforms).call(this, uniforms);
    }
    setUniform(name, value) {
        var _a;
        this.gl.useProgram(this.id);
        name = (_a = this.getUniformLoc(name)) !== null && _a !== void 0 ? _a : error(`Invalid uniform name: '${name}'`);
        if (typeof value == "number")
            this.gl.uniform1i(name, value);
        else if (value.length == 1)
            this.gl.uniform1f(name, ...value);
        else if (value.length == 2)
            this.gl.uniform2f(name, ...value);
        else if (value.length == 3)
            this.gl.uniform3f(name, ...value);
        else if (value.length == 4)
            this.gl.uniform4f(name, ...value);
    }
    setMatAttrib(name, matDimensions, stride = null, offset = 0) {
        var _a;
        stride || (stride = matDimensions * matDimensions);
        name = (_a = this.getAttribLoc(name)) !== null && _a !== void 0 ? _a : error(`Invalid attribute name: '${name}'`);
        for (let i = 0; i < matDimensions; ++i) {
            const pos = name + i;
            this.gl.enableVertexAttribArray(pos);
            this.gl.vertexAttribPointer(pos, matDimensions, this.gl.FLOAT, false, FLOAT_SIZE * stride, FLOAT_SIZE * (offset + matDimensions * i));
        }
        return {
            divisor: () => {
                for (let i = 0; i < matDimensions; ++i)
                    this.gl.vertexAttribDivisor(name + i, 1);
            }
        };
    }
    setVecAttrib(name, vecDimensions, stride = null, offset = 0) {
        stride || (stride = vecDimensions);
        let locationIndex = this.getAttribLoc(name);
        if (locationIndex == -1)
            return console.warn(locationIndex == name ? `[setVecAttrib] location: ${name}` : `[setVecAttrib] location: "${name}" doesn't exist`);
        this.gl.enableVertexAttribArray(locationIndex);
        this.gl.vertexAttribPointer(locationIndex, // location
        vecDimensions, // size (num values to pull from buffer per iteration)
        this.gl.FLOAT, // type of data in buffer
        false, // normalize
        stride * FLOAT_SIZE, // stride (0 = compute from size and type above)
        offset * FLOAT_SIZE);
        return { divisor: () => this.gl.vertexAttribDivisor(locationIndex, 1) };
    }
    setAttribs(...attribs) {
        if (attribs.length % 2 != 0)
            throw `Invalid attributes: ${attribs}`;
        let stride = 0;
        for (let i = 0; i < attribs.length; ++i)
            stride += attribs[i][1];
        for (let i = 0, offset = 0; i < attribs.length; ++i) {
            this.setVecAttrib(attribs[i][0], attribs[i][1], stride, offset);
            offset += attribs[i][1];
        }
    }
}
_GLProgram_instances = new WeakSet(), _GLProgram_createShader = function _GLProgram_createShader(type, source) {
    var _a;
    let shaderName = undefined;
    if (type == this.gl.VERTEX_SHADER)
        shaderName = "vertex";
    else if (type == this.gl.FRAGMENT_SHADER)
        shaderName = "fragment";
    const shader = (_a = this.gl.createShader(type)) !== null && _a !== void 0 ? _a : error(`Can't create ${shaderName} shader`);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
        return shader;
    if (!shaderName)
        throw Error("> [ERROR] shader type is unknown");
    console.error(`> Error compiling ${shaderName} shader:\n${this.gl.getShaderInfoLog(shader)}`);
    this.gl.deleteShader(shader);
}, _GLProgram_createProgram = function _GLProgram_createProgram(vertexShader, fragmentShader) {
    var _a;
    const program = (_a = this.gl.createProgram()) !== null && _a !== void 0 ? _a : error(`Can't create shader program`);
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS))
        return program;
    console.error(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);
}, _GLProgram_loadUniforms = function _GLProgram_loadUniforms(uniforms) {
    var _a;
    for (const [name, value] of uniforms)
        this.setUniform((_a = this.getUniformLoc(name)) !== null && _a !== void 0 ? _a : error(`Invalid uniform name: '${name}'`), value);
};
export class GLBuffer {
    constructor(gl, dynamic = true) {
        var _a;
        _GLBuffer_instances.add(this);
        this.glReservedSize = 0;
        this.size = 0;
        this.gl = gl;
        this.dynamic = dynamic;
        this.id = (_a = gl.createBuffer()) !== null && _a !== void 0 ? _a : error("Can't create buffer");
    }
    bind() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
    }
    update(buffer, size) {
        this.size = size || (buffer.byteLength / Float32Array.BYTES_PER_ELEMENT);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
        if (this.glReservedSize < this.size)
            __classPrivateFieldGet(this, _GLBuffer_instances, "m", _GLBuffer_resize).call(this, buffer);
        else
            this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(buffer, 0, this.size));
    }
}
_GLBuffer_instances = new WeakSet(), _GLBuffer_resize = function _GLBuffer_resize(buffer) {
    this.glReservedSize = buffer.byteLength / Float32Array.BYTES_PER_ELEMENT;
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(buffer), this.dynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW);
};
class GLTextureConfig {
    constructor(data = {}) {
        this.mipmap = true;
        this.minFilter = "linear";
        this.magFilter = "nearest";
        this.wrapX = "clamp";
        this.wrapY = "clamp";
        if (data.mipmap)
            this.mipmap = data.mipmap;
        if (data.minFilter)
            this.minFilter = data.minFilter;
        if (data.magFilter)
            this.magFilter = data.magFilter;
        if (data.wrapX)
            this.wrapX = data.wrapX;
        if (data.wrapY)
            this.wrapY = data.wrapY;
    }
    setConfig() {
        if (this.mipmap)
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.glWrap(this.wrapX));
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.glWrap(this.wrapY));
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.glMinFilter(this.minFilter));
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.glMagFilter(this.magFilter));
    }
    glWrap(type) {
        return type === "clamp" ? this.gl.CLAMP_TO_EDGE : type === "repeat" ? this.gl.REPEAT : this.gl.MIRRORED_REPEAT;
    }
    glMinFilter(type) {
        if (!this.mipmap)
            return this.glMagFilter(type);
        return type === "linear" ? this.gl.LINEAR_MIPMAP_LINEAR : this.gl.NEAREST_MIPMAP_NEAREST;
    }
    glMagFilter(type) {
        return type === "linear" ? this.gl.LINEAR : this.gl.NEAREST;
    }
}
export class GLTexture extends GLTextureConfig {
    constructor(gl, slot = 0, url, config = {}) {
        var _a;
        super(config);
        this.size = [0, 0];
        this.gl = gl;
        this.slot = slot;
        this.id = (_a = gl.createTexture()) !== null && _a !== void 0 ? _a : error("Can't create texture");
        this.use();
        this.setDefaultImage();
        this.loadPromise = new Promise(resolve => {
            if (!url)
                return resolve();
            const image = new Image();
            image.onload = () => {
                this.size = [image.width, image.height];
                this.use();
                gl.texImage2D(gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
                this.setConfig();
                resolve();
            };
            image.src = url;
        });
    }
    async onLoad(callback) {
        await this.loadPromise;
        callback === null || callback === void 0 ? void 0 : callback(this);
    }
    use() {
        this.gl.activeTexture(this.gl.TEXTURE0 + this.slot);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
    }
    setDefaultImage() {
        const defaultTexture = new Uint8Array([0, 0, 255, 255, 255, 0, 255, 255, 0, 0, 255, 255, 255, 0, 255, 255, 0, 0, 255, 255, 255, 0, 255, 255, 0, 0, 255, 255, 255, 0, 255, 255, 0, 0, 255, 255]); // default texture
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 3, 3, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, defaultTexture);
    }
}
//# sourceMappingURL=webGl.js.map