var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PushBuffer_instances, _PushBuffer_resize;
import { vec } from "..";
import { matrix } from "../vec";
class GraphicsState {
    constructor(copy) {
        if (copy) {
            this.matrix = [...copy.matrix];
            this.color = [...copy.color];
            this.lineColor = [...copy.lineColor];
            this.stroke = copy.stroke;
            this.lineWidth = copy.lineWidth;
            this.lineCap = copy.lineCap;
            this.lineJoin = copy.lineJoin;
            this.textureID = copy.textureID;
            this.quadUV = [...copy.quadUV];
        }
        else {
            this.matrix = matrix.new([4, 4]);
            this.color = [0.3, 0.3, 0.3, 1];
            this.lineColor = [0, 0, 0, 1];
            this.stroke = true;
            this.lineWidth = .1;
            this.lineCap = "round";
            this.lineJoin = "round";
            this.textureID = null;
            this.quadUV = [0, 0, 1, 1];
        }
    }
}
class GraphicsStateStack {
    constructor() {
        this.stateStack = [new GraphicsState()];
    }
    set color(c) { setColor(this.current.color, c); }
    get color() { return this.current.color; }
    set stroke(enable) { this.current.stroke = enable; }
    get stroke() { return this.current.stroke; }
    set lineColor(c) { setColor(this.current.lineColor, c); }
    get lineColor() { return this.current.lineColor; }
    set lineWidth(width) { this.current.lineWidth = width; }
    get lineWidth() { return this.current.lineWidth; }
    set lineCap(type) { this.current.lineCap = type; }
    get lineCap() { return this.current.lineCap; }
    set lineJoin(type) { this.current.lineJoin = type; }
    get lineJoin() { return this.current.lineJoin; }
    set texture(id) { this.current.textureID = typeof id === "number" ? id : id ? id.slot : null; }
    get texture() { return this.current.textureID; }
    set quadUV(uv) { this.current.quadUV = uv; }
    get quadUV() { return this.current.quadUV; }
    set matrix(mat) { this.current.matrix = mat; }
    get matrix() { return this.current.matrix; }
    rotateX(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.current.matrix = matrix.dot(this.current.matrix, 4, [
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1,
        ], 4);
    }
    rotateY(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.current.matrix = matrix.dot(this.current.matrix, 4, [
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1,
        ], 4);
    }
    rotateZ(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.current.matrix = matrix.dot(this.current.matrix, 4, [
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ], 4);
    }
    rotate(angle, axis) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        if (!axis) {
            this.current.matrix = matrix.dot(this.current.matrix, 4, [
                c, -s, 0, 0,
                s, c, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ], 4);
        }
        else {
            const t = 1 - c;
            const [x, y, z] = vec.normalize(axis);
            this.current.matrix = matrix.dot(this.current.matrix, 4, [
                t * x * x + c, t * x * y + z * s, t * x * z - y * s, 0,
                t * x * y - z * s, t * y * y + c, t * y * z + x * s, 0,
                t * x * z + y * s, t * y * z - x * s, t * z * z + c, 0,
                0, 0, 0, 1,
            ], 4);
        }
    }
    scale(x, y, z) {
        this.current.matrix = matrix.dot(this.current.matrix, 4, [x, 0, 0, 0, 0, y !== null && y !== void 0 ? y : x, 0, 0, 0, 0, z !== null && z !== void 0 ? z : (y ? 1 : x), 0, 0, 0, 0, 1], 4);
    }
    translate(x, y, z = 0) {
        this.current.matrix = matrix.dot(this.current.matrix, 4, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1], 4);
    }
    push() { this.stateStack.push(new GraphicsState(this.current)); }
    pop() { this.stateStack.pop(); }
    get current() { return this.stateStack[this.stateStack.length - 1]; }
    reset() { this.stateStack = [new GraphicsState()]; }
}
class GraphicsFunctions {
    constructor() {
        this.state = new GraphicsStateStack();
        this.buffer = new PushBuffer();
        this.triangle = this.triangle.bind(this);
        this.ellipse = this.ellipse.bind(this);
        this.rect = this.rect.bind(this);
        this.triangleStrip = this.triangleStrip.bind(this);
        this.background = this.background.bind(this);
        this.line = this.line.bind(this);
    }
    triangleStrip(vertices) {
        for (let i = 2; i < vertices.length; ++i) {
            this.triangle(vertices[i], vertices[i - 1], vertices[i - 2]);
        }
    }
    background(...color) {
        const [r, g, b, a] = setColor([0, 0, 0, 0], color);
        const va = [-100, -100];
        const vb = [100, -100];
        const vc = [-100, 100];
        const vd = [100, 100];
        this.buffer.push([
            vb[0], vb[1], 0, 0, 0, r, g, b, a, 0,
            vd[0], vd[1], 0, 0, 0, r, g, b, a, 0,
            vc[0], vc[1], 0, 0, 0, r, g, b, a, 0,
            vc[0], vc[1], 0, 0, 0, r, g, b, a, 0,
            va[0], va[1], 0, 0, 0, r, g, b, a, 0,
            vb[0], vb[1], 0, 0, 0, r, g, b, a, 0,
        ]);
    }
    triangle(a, b, c) {
        var _a, _b, _c;
        a = matrix.dot(this.state.matrix, 4, [a[0], a[1], (_a = a[2]) !== null && _a !== void 0 ? _a : 0]);
        b = matrix.dot(this.state.matrix, 4, [b[0], b[1], (_b = b[2]) !== null && _b !== void 0 ? _b : 0]);
        c = matrix.dot(this.state.matrix, 4, [c[0], c[1], (_c = c[2]) !== null && _c !== void 0 ? _c : 0]);
        this.buffer.push([
            a[0], a[1], a[2], 0, 0, ...this.state.color, 0,
            b[0], b[1], b[2], 0, 0, ...this.state.color, 0,
            c[0], c[1], c[2], 0, 0, ...this.state.color, 0,
        ]);
    }
    ellipse(x, y, width, height) {
        height || (height = width);
        width /= 2;
        height /= 2;
        const x0 = x - width;
        const y0 = y - height;
        const x1 = x + width;
        const y1 = y + height;
        const a = matrix.dot(this.state.matrix, 4, [x0, y0, 0]);
        const b = matrix.dot(this.state.matrix, 4, [x1, y0, 0]);
        const c = matrix.dot(this.state.matrix, 4, [x0, y1, 0]);
        const d = matrix.dot(this.state.matrix, 4, [x1, y1, 0]);
        let textureID = 1 << 31;
        if (this.state.texture !== null)
            textureID |= (this.state.texture << 24) | (1 << 30);
        this.buffer.push([
            b[0], b[1], b[2], -height, height, ...this.state.color, textureID,
            d[0], d[1], d[2], -height, -height, ...this.state.color, textureID,
            c[0], c[1], c[2], height, -height, ...this.state.color, textureID,
            c[0], c[1], c[2], height, -height, ...this.state.color, textureID,
            a[0], a[1], a[2], height, height, ...this.state.color, textureID,
            b[0], b[1], b[2], -height, height, ...this.state.color, textureID,
        ]);
    }
    rect(x, y, width, height) {
        height || (height = width);
        width /= 2;
        height /= 2;
        const x0 = x - width;
        const y0 = y - height;
        const x1 = x + width;
        const y1 = y + height;
        const va = matrix.dot(this.state.matrix, 4, [x0, y0, 0]);
        const vb = matrix.dot(this.state.matrix, 4, [x1, y0, 0]);
        const vc = matrix.dot(this.state.matrix, 4, [x0, y1, 0]);
        const vd = matrix.dot(this.state.matrix, 4, [x1, y1, 0]);
        const uv = this.state.quadUV;
        const [r, g, b, a] = this.state.color;
        let textureID = 0;
        if (this.state.texture !== null)
            textureID |= (this.state.texture << 24) | (1 << 30);
        let uva = [uv[0], uv[3]];
        let uvb = [uv[2], uv[3]];
        let uvc = [uv[0], uv[1]];
        let uvd = [uv[2], uv[1]];
        if (uv.length == 8) {
            uva = [uv[0], uv[7]];
            uvb = [uv[2], uv[5]];
            uvc = [uv[4], uv[3]];
            uvd = [uv[6], uv[1]];
        }
        this.buffer.push([
            vb[0], vb[1], vb[2], uvb[0], uvb[1], r, g, b, a, textureID,
            vd[0], vd[1], vd[2], uvd[0], uvd[1], r, g, b, a, textureID,
            vc[0], vc[1], vc[2], uvc[0], uvc[1], r, g, b, a, textureID,
            vc[0], vc[1], vc[2], uvc[0], uvc[1], r, g, b, a, textureID,
            va[0], va[1], va[2], uva[0], uva[1], r, g, b, a, textureID,
            vb[0], vb[1], vb[2], uvb[0], uvb[1], r, g, b, a, textureID,
        ]);
    }
    line(vertices, close = false) {
        for (let i = 1; i < vertices.length; ++i)
            this.segment(vertices[i - 2], vertices[i - 1], vertices[i], vertices[i + 1]);
        if (close && vertices.length > 2)
            this.segment(vertices[vertices.length - 2], vertices[vertices.length - 1], vertices[0], vertices[1]);
    }
    segment(past, a, b, next) {
        var _a, _b, _c, _d;
        const u = vec.resize(vec.sub(b, a), this.state.lineWidth / 2);
        const v = [u[1], -u[0]];
        const upA = vec.add(a, v);
        const downA = vec.sub(a, v);
        const upB = vec.add(b, v);
        const downB = vec.sub(b, v);
        // const upA = vec.add(a, v, u)
        // const downA = vec.add(vec.sub(a, v), u)
        // const upB = vec.sub(vec.add(b, v), u)
        // const downB = vec.sub(b, v, u)
        const quadA = matrix.dot(this.state.matrix, 4, [upA[0], upA[1], (_a = upA[2]) !== null && _a !== void 0 ? _a : 0]);
        const quadB = matrix.dot(this.state.matrix, 4, [downA[0], downA[1], (_b = downA[2]) !== null && _b !== void 0 ? _b : 0]);
        const quadC = matrix.dot(this.state.matrix, 4, [upB[0], upB[1], (_c = upB[2]) !== null && _c !== void 0 ? _c : 0]);
        const quadD = matrix.dot(this.state.matrix, 4, [downB[0], downB[1], (_d = downB[2]) !== null && _d !== void 0 ? _d : 0]);
        this.buffer.push([
            quadB[0], quadB[1], quadB[2], -1, 1, ...this.state.color, 0,
            quadD[0], quadD[1], quadD[2], -1, -1, ...this.state.color, 0,
            quadC[0], quadC[1], quadC[2], 1, -1, ...this.state.color, 0,
            quadC[0], quadC[1], quadC[2], 1, -1, ...this.state.color, 0,
            quadA[0], quadA[1], quadA[2], 1, 1, ...this.state.color, 0,
            quadB[0], quadB[1], quadB[2], -1, 1, ...this.state.color, 0,
        ]);
    }
}
export class GraphicsAPI extends GraphicsFunctions {
    constructor() {
        super();
    }
    createFrame() {
        this.state.reset();
        return {
            verticesCount: this.buffer.size / 10,
            buffer: this.buffer.clear()
        };
    }
}
class PushBuffer {
    constructor(reserve = 1024, BufferConstructor = ArrayBuffer) {
        _PushBuffer_instances.add(this);
        this.BufferConstructor = BufferConstructor;
        this.size = 0;
        this.buffer = new this.BufferConstructor(reserve);
        this.f32 = new Float32Array(this.buffer);
    }
    push(data) {
        if (this.buffer.byteLength / Float32Array.BYTES_PER_ELEMENT <= this.size + data.length)
            __classPrivateFieldGet(this, _PushBuffer_instances, "m", _PushBuffer_resize).call(this, 2 * (this.size + data.length));
        this.f32.set(data, this.size);
        this.size += data.length;
    }
    clear() {
        this.size = 0;
        return this.buffer;
    }
}
_PushBuffer_instances = new WeakSet(), _PushBuffer_resize = function _PushBuffer_resize(newSize) {
    const pastArray = this.f32;
    this.buffer = new this.BufferConstructor(newSize * Float32Array.BYTES_PER_ELEMENT);
    this.f32 = new Float32Array(this.buffer);
    if (pastArray)
        this.f32.set(pastArray, 0);
};
function setColor(buffer, newColor) {
    if (typeof newColor == "number") {
        buffer[0] = newColor;
        buffer[1] = newColor;
        buffer[2] = newColor;
        buffer[3] = 1;
        return buffer;
    }
    buffer[0] = newColor[0];
    switch (newColor.length) {
        case 1:
            buffer[1] = newColor[0];
            buffer[2] = newColor[0];
            buffer[3] = 1;
            return buffer;
        case 2:
            buffer[1] = newColor[0];
            buffer[2] = newColor[0];
            buffer[3] = newColor[1];
            return buffer;
        case 3:
            buffer[1] = newColor[1];
            buffer[2] = newColor[2];
            buffer[3] = 1;
            return buffer;
        case 4:
            buffer[1] = newColor[1];
            buffer[2] = newColor[2];
            buffer[3] = newColor[3];
    }
    return buffer;
}
//# sourceMappingURL=graphicsAPI.js.map