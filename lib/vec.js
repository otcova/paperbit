"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matrix = exports.vec = void 0;
function getLenOfVectorsAndScalars(...vectors) {
    let len = null;
    for (let i = 0; i < vectors.length; ++i) {
        const v = vectors[i];
        if (typeof v != "number") {
            if (!len)
                len = v.length;
            else if (len != v.length)
                throw Error("Invalid arguments");
        }
    }
    return len !== null && len !== void 0 ? len : (vectors.length > 0 ? 1 : 0);
}
class Vec {
    new(length, value = 0) {
        const array = Array(typeof length == "number" ? length : length.length);
        if (typeof value == "number")
            return array.fill(value);
        for (let i = 0; i < array.length; ++i)
            array[i] = value(i);
        return array;
    }
    equal(a, b, tolerance = 1e-9) {
        if (a.length != b.length)
            return false;
        if (typeof tolerance == "number") {
            for (let i = 0; i < a.length; ++i)
                if (Math.abs(a[i] - b[i]) > tolerance)
                    return false;
        }
        else {
            for (let i = 0; i < a.length; ++i)
                if (Math.abs(a[i] - b[i]) > tolerance[i])
                    return false;
        }
        return true;
    }
    // simple operations
    add(v, ...vectors) {
        const len = getLenOfVectorsAndScalars(v, ...vectors);
        // @ts-ignore
        return this.new(len, i => { var _a; return vectors.reduce((sum, v) => { var _a; return sum + ((_a = v === null || v === void 0 ? void 0 : v[i]) !== null && _a !== void 0 ? _a : v); }, (_a = v === null || v === void 0 ? void 0 : v[i]) !== null && _a !== void 0 ? _a : v); });
    }
    sub(v, ...vectors) {
        const len = getLenOfVectorsAndScalars(v, ...vectors);
        // @ts-ignore
        return this.new(len, i => { var _a; return vectors.reduce((sum, v) => { var _a; return sum - ((_a = v === null || v === void 0 ? void 0 : v[i]) !== null && _a !== void 0 ? _a : v); }, (_a = v === null || v === void 0 ? void 0 : v[i]) !== null && _a !== void 0 ? _a : v); });
    }
    mult(v, ...vectors) {
        const len = getLenOfVectorsAndScalars(v, ...vectors);
        // @ts-ignore
        return this.new(len, i => { var _a; return vectors.reduce((sum, v) => { var _a; return sum * ((_a = v === null || v === void 0 ? void 0 : v[i]) !== null && _a !== void 0 ? _a : v); }, (_a = v === null || v === void 0 ? void 0 : v[i]) !== null && _a !== void 0 ? _a : v); });
    }
    div(v, ...vectors) {
        const len = getLenOfVectorsAndScalars(v, ...vectors);
        // @ts-ignore
        return this.new(len, i => { var _a; return vectors.reduce((sum, v) => { var _a; return sum / ((_a = v === null || v === void 0 ? void 0 : v[i]) !== null && _a !== void 0 ? _a : v); }, (_a = v === null || v === void 0 ? void 0 : v[i]) !== null && _a !== void 0 ? _a : v); });
    }
    // singel vector
    round(v) {
        return this.new(v, i => Math.round(v[i]));
    }
    floor(v) {
        return this.new(v, i => Math.floor(v[i]));
    }
    ceil(v) {
        return this.new(v, i => Math.ceil(v[i]));
    }
    //spatial
    distance(a, b) {
        if (a.length != b.length)
            throw Error("Invalid arguments");
        return exports.vec.length(exports.vec.sub(a, b));
    }
    // vectorial
    dot(v, u) {
        if (v.length != u.length)
            throw Error("Invalid arguments");
        return v.reduce((sum, vi, i) => sum + vi * u[i], 0);
    }
    length(v) {
        return Math.hypot(...v);
    }
    resize(v, newSize) {
        const len = this.length(v) / newSize;
        return this.new(v, i => v[i] / len);
    }
    normalize(v) {
        const len = this.length(v);
        return this.new(v, i => v[i] / len);
    }
}
class Matrix {
    new([width, height], value = 1) {
        const array = Array(width * height);
        if (typeof value == "number") {
            for (let x = 0; x < width; ++x) {
                for (let y = 0; y < height; ++y)
                    array[y + x * height] = x == y ? value : 0;
            }
        }
        else {
            for (let x = 0; x < width; ++x) {
                for (let y = 0; y < height; ++y)
                    array[y + x * height] = value([x, y]);
            }
        }
        return array;
    }
    add(matA, matB) {
        if (matA.length != matB.length || !Array.isArray(matA) || !Array.isArray(matB))
            return NaN;
        return exports.vec.new(matA.length, n => matA[n] + matB[n]);
    }
    sub(matA, matB) {
        if (matA.length != matB.length || !Array.isArray(matA) || !Array.isArray(matB))
            return NaN;
        return exports.vec.new(matA.length, n => matA[n] - matB[n]);
    }
    mult(matA, matB) {
        if (matA.length != matB.length || !Array.isArray(matA) || !Array.isArray(matB))
            return NaN;
        return exports.vec.new(matA.length, n => matA[n] * matB[n]);
    }
    div(matA, matB) {
        if (matA.length != matB.length || !Array.isArray(matA) || !Array.isArray(matB))
            return NaN;
        return exports.vec.new(matA.length, n => matA[n] / matB[n]);
    }
    dot(matA, matAWidth, matB, matBWidth = 1) {
        if (!Array.isArray(matA) || !Array.isArray(matB) || !Number.isSafeInteger(matAWidth) || !Number.isSafeInteger(matBWidth) || matAWidth < 0 || matBWidth < 0)
            return NaN;
        const matAHeight = matA.length / matAWidth;
        const matBHeight = matB.length / matBWidth;
        if (matAWidth < matBHeight)
            return NaN;
        return this.new([matBWidth, matAHeight], ([x, y]) => {
            let n = 0;
            for (let i = 0; i < matAWidth; ++i)
                n += matA[y + i * matAHeight] * (i < matBHeight ? matB[i + x * matBHeight] : 1);
            return n;
        });
    }
    invert4x4(m) {
        const A2323 = m[10] * m[15] - m[11] * m[14];
        const A1323 = m[9] * m[15] - m[11] * m[13];
        const A1223 = m[9] * m[14] - m[10] * m[13];
        const A0323 = m[8] * m[15] - m[11] * m[12];
        const A0223 = m[8] * m[14] - m[10] * m[12];
        const A0123 = m[8] * m[13] - m[9] * m[12];
        const A2313 = m[6] * m[15] - m[7] * m[14];
        const A1313 = m[5] * m[15] - m[7] * m[13];
        const A1213 = m[5] * m[14] - m[6] * m[13];
        const A2312 = m[6] * m[11] - m[7] * m[10];
        const A1312 = m[5] * m[11] - m[7] * m[9];
        const A1212 = m[5] * m[10] - m[6] * m[9];
        const A0313 = m[4] * m[15] - m[7] * m[12];
        const A0213 = m[4] * m[14] - m[6] * m[12];
        const A0312 = m[4] * m[11] - m[7] * m[8];
        const A0212 = m[4] * m[10] - m[6] * m[8];
        const A0113 = m[4] * m[13] - m[5] * m[12];
        const A0112 = m[4] * m[9] - m[5] * m[8];
        let det = m[0] * (m[5] * A2323 - m[6] * A1323 + m[7] * A1223)
            - m[1] * (m[4] * A2323 - m[6] * A0323 + m[7] * A0223)
            + m[2] * (m[4] * A1323 - m[5] * A0323 + m[7] * A0123)
            - m[3] * (m[4] * A1223 - m[5] * A0223 + m[6] * A0123);
        det = 1 / det;
        return [
            det * (m[5] * A2323 - m[6] * A1323 + m[7] * A1223),
            det * -(m[1] * A2323 - m[2] * A1323 + m[3] * A1223),
            det * (m[1] * A2313 - m[2] * A1313 + m[3] * A1213),
            det * -(m[1] * A2312 - m[2] * A1312 + m[3] * A1212),
            det * -(m[4] * A2323 - m[6] * A0323 + m[7] * A0223),
            det * (m[0] * A2323 - m[2] * A0323 + m[3] * A0223),
            det * -(m[0] * A2313 - m[2] * A0313 + m[3] * A0213),
            det * (m[0] * A2312 - m[2] * A0312 + m[3] * A0212),
            det * (m[4] * A1323 - m[5] * A0323 + m[7] * A0123),
            det * -(m[0] * A1323 - m[1] * A0323 + m[3] * A0123),
            det * (m[0] * A1313 - m[1] * A0313 + m[3] * A0113),
            det * -(m[0] * A1312 - m[1] * A0312 + m[3] * A0112),
            det * -(m[4] * A1223 - m[5] * A0223 + m[6] * A0123),
            det * (m[0] * A1223 - m[1] * A0223 + m[2] * A0123),
            det * -(m[0] * A1213 - m[1] * A0213 + m[2] * A0113),
            det * (m[0] * A1212 - m[1] * A0212 + m[2] * A0112),
        ];
    }
}
exports.vec = new Vec();
exports.matrix = new Matrix();
//# sourceMappingURL=vec.js.map