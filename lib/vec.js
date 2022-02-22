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
    equal(a, b, tolerance = 0.000000001) {
        if (a.length != b.length)
            return false;
        for (let i = 0; i < a.length; ++i)
            if (Math.abs(a[i] - b[i]) > tolerance)
                return false;
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
    dist(a, b) {
        if (a.length != b.length)
            throw Error("Invalid arguments");
        return vec.length(vec.sub(a, b));
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
        return vec.new(matA.length, n => matA[n] + matB[n]);
    }
    sub(matA, matB) {
        if (matA.length != matB.length || !Array.isArray(matA) || !Array.isArray(matB))
            return NaN;
        return vec.new(matA.length, n => matA[n] - matB[n]);
    }
    mult(matA, matB) {
        if (matA.length != matB.length || !Array.isArray(matA) || !Array.isArray(matB))
            return NaN;
        return vec.new(matA.length, n => matA[n] * matB[n]);
    }
    div(matA, matB) {
        if (matA.length != matB.length || !Array.isArray(matA) || !Array.isArray(matB))
            return NaN;
        return vec.new(matA.length, n => matA[n] / matB[n]);
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
}
export const vec = new Vec();
export const matrix = new Matrix();
//# sourceMappingURL=vec.js.map