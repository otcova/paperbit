"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphicsStateStack = void 0;
const vec_1 = require("../../vec");
const innerUtils_1 = require("./innerUtils");
class GraphicsState {
    constructor(copy) {
        if (copy) {
            this.matrix = [...copy.matrix];
            this.color = [...copy.color];
            this.lineColor = [...copy.lineColor];
            this.lineWidth = copy.lineWidth;
            this.lineCap = copy.lineCap;
            this.lineJoin = copy.lineJoin;
            this.font = copy.font;
            this.texture = copy.texture;
            this.textureColorBlend = copy.textureColorBlend;
            this.rectOrigin = [...copy.rectOrigin];
            this.rectUV = [...copy.rectUV];
            this.textOrigin = [...copy.textOrigin];
        }
        else {
            this.matrix = vec_1.matrix.new([4, 4]);
            this.color = [0.3, 0.3, 0.3, 1];
            this.lineColor = [0, 0, 0, 1];
            this.lineWidth = .1;
            this.lineCap = "round";
            this.lineJoin = "round";
            this.font = null;
            this.texture = null;
            this.textureColorBlend = "*";
            this.rectOrigin = [0, 0];
            this.rectUV = [0, 0, 1, 1];
            this.textOrigin = [0, -1];
        }
    }
}
class GraphicsStateStack {
    constructor() {
        this.stateStack = [new GraphicsState()];
    }
    set color(c) { (0, innerUtils_1.setColor)(this.current.color, c); }
    get color() { return this.current.color; }
    set colorHex(c) { (0, innerUtils_1.setColor)(this.current.color, vec_1.vec.div(c, 255)); }
    get colorHex() { return vec_1.vec.mult(this.current.color, 255); }
    set colorAlpha(alpha) { this.current.color[3] = alpha; }
    get colorAlpha() { return this.current.color[3]; }
    set lineColor(c) { (0, innerUtils_1.setColor)(this.current.lineColor, c); }
    get lineColor() { return this.current.lineColor; }
    set lineWidth(width) { this.current.lineWidth = width; }
    get lineWidth() { return this.current.lineWidth; }
    set lineCap(type) { this.current.lineCap = type; }
    get lineCap() { return this.current.lineCap; }
    set lineJoin(type) { this.current.lineJoin = type; }
    get lineJoin() { return this.current.lineJoin; }
    set font(font) { this.current.font = font; }
    get font() { return this.current.font; }
    set texture(tex) { this.current.texture = tex; }
    get texture() { return this.current.texture; }
    set textureColorBlend(algorithm) { this.current.textureColorBlend = algorithm; }
    get textureColorBlend() { return this.current.textureColorBlend; }
    set rectUV(uv) { this.current.rectUV = uv; }
    get rectUV() { return this.current.rectUV; }
    set rectOrigin(origin) { this.current.rectOrigin = origin; }
    get rectOrigin() { return this.current.rectOrigin; }
    set matrix(mat) { this.current.matrix = mat; }
    get matrix() { return this.current.matrix; }
    get inverseMatrix() { return vec_1.matrix.invert4x4(this.current.matrix); }
    set textOrigin(origin) { this.current.textOrigin = origin; }
    get textOrigin() { return this.current.textOrigin; }
    rotateX(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.current.matrix = vec_1.matrix.dot(this.current.matrix, 4, [
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1,
        ], 4);
    }
    rotateY(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.current.matrix = vec_1.matrix.dot(this.current.matrix, 4, [
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1,
        ], 4);
    }
    rotateZ(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.current.matrix = vec_1.matrix.dot(this.current.matrix, 4, [
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
            this.current.matrix = vec_1.matrix.dot(this.current.matrix, 4, [
                c, -s, 0, 0,
                s, c, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ], 4);
        }
        else {
            const t = 1 - c;
            const [x, y, z] = vec_1.vec.normalize(axis);
            this.current.matrix = vec_1.matrix.dot(this.current.matrix, 4, [
                t * x * x + c, t * x * y + z * s, t * x * z - y * s, 0,
                t * x * y - z * s, t * y * y + c, t * y * z + x * s, 0,
                t * x * z + y * s, t * y * z - x * s, t * z * z + c, 0,
                0, 0, 0, 1,
            ], 4);
        }
    }
    scale(x, y, z) {
        this.current.matrix = vec_1.matrix.dot(this.current.matrix, 4, [x, 0, 0, 0, 0, y !== null && y !== void 0 ? y : x, 0, 0, 0, 0, z !== null && z !== void 0 ? z : (y ? 1 : x), 0, 0, 0, 0, 1], 4);
    }
    translate(x, y, z = 0) {
        this.current.matrix = vec_1.matrix.dot(this.current.matrix, 4, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1], 4);
    }
    scope(scopedCode) {
        this.stateStack.push(new GraphicsState(this.current));
        scopedCode();
        this.stateStack.pop();
    }
    // push() { this.stateStack.push(new GraphicsState(this.current)) }
    // pop() { this.stateStack.pop() }
    get current() { return this.stateStack[this.stateStack.length - 1]; }
    reset() { this.stateStack = [new GraphicsState()]; }
}
exports.GraphicsStateStack = GraphicsStateStack;
//# sourceMappingURL=state.js.map