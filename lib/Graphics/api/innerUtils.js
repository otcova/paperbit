var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PushBuffer_instances, _PushBuffer_resize;
export function setColor(buffer, newColor) {
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
export class PushBuffer {
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
//# sourceMappingURL=innerUtils.js.map