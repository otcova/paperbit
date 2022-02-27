"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmoothBit = void 0;
class SmoothBit {
    constructor(zero = 0, one = 1, duration = 1 / 4) {
        this.t0 = 0;
        this.target = false;
        this.duration = duration;
        this.zero = zero;
        this.one = one;
        this.t0 = this.currenTime;
    }
    set(value) {
        if (this.target != value) {
            this.target = value;
            const dt = (this.currenTime - this.t0) / this.duration;
            if (dt > 1)
                this.t0 = this.currenTime;
            else
                this.t0 = this.currenTime - (1 - dt);
        }
        return this;
    }
    get(zero, one) {
        zero !== null && zero !== void 0 ? zero : (zero = this.zero);
        one !== null && one !== void 0 ? one : (one = this.one);
        const dt = (this.currenTime - this.t0) / this.duration;
        if (dt >= 1)
            return this.target ? this.one : this.zero;
        let x = easeInOutSine(dt);
        if (!this.target)
            x = 1 - x;
        x = zero + x * (one - zero);
        return x;
    }
    get currenTime() {
        return performance.now() / 1000;
    }
}
exports.SmoothBit = SmoothBit;
function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}
//# sourceMappingURL=smooth.js.map