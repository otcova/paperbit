"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geometry = void 0;
const _1 = require(".");
class Point {
    constructor(coord) {
        this.coord = coord;
    }
    distanceTo(obj) {
        if (obj instanceof Point)
            return _1.vec.dist(this.coord, obj.coord);
        else if (obj instanceof Segment) {
            console.log("TODO: distance point-segment");
            return 0;
        }
        else if (obj instanceof Rect) {
            let inside = 0;
            let vertDistA = Math.min(Math.abs(this.coord[0] - obj.a[0]), Math.abs(this.coord[0] - obj.b[0]));
            let vertDistB = Math.min(Math.abs(this.coord[1] - obj.a[1]), Math.abs(this.coord[1] - obj.b[1]));
            let distA = vertDistA;
            let distB = vertDistB;
            if (this.coord[1] < obj.a[1] || this.coord[1] > obj.b[1])
                distA = Math.hypot(vertDistA, vertDistB);
            else
                inside++;
            if (this.coord[0] < obj.a[0] || this.coord[0] > obj.b[0])
                distB = Math.hypot(vertDistA, vertDistB);
            else
                inside++;
            const modul = Math.min(distA, distB);
            if (inside == 2)
                return -modul;
            return modul;
        }
    }
}
class Segment {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    distanceTo(obj) {
        return obj.distanceTo(this);
    }
}
class Rect {
    constructor(coord, size) {
        size = _1.vec.mult(size, .5);
        this.a = _1.vec.sub(coord, size);
        this.b = _1.vec.add(coord, size);
    }
    distanceTo(obj) {
        return obj.distanceTo(this);
    }
}
exports.geometry = {
    point: (coord) => new Point(coord),
    segment: (a, b) => new Segment(a, b),
    rect: (coord, size) => new Rect(coord, size),
    // intersect: ([x1, y1]: [number, number], [x2, y2]: [number, number], [x3, y3]: [number, number], [x4, y4]: [number, number]) => {
    // 	// Check if none of the lines are of length 0
    // 	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4))
    // 		return false
    // 	const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
    // 	// Lines are parallel
    // 	if (denominator === 0) return false
    // 	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    // 	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
    // 	// is the intersection along the segments
    // 	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false
    // 	// Return a object with the x and y coordinates of the intersection
    // 	return [x1 + ua * (x2 - x1), y1 + ua * (y2 - y1)]
    // },
    // reflect: (v: number[], n: number[]) => {
    // 	n = vec.normalize(n)
    // 	return vec.sub(v, vec.mult(2 * vec.dot(v, n), n))
    // },
    // nearestToPolygon: (p: [number, number], vertices: [number, number][]) => {
    // 	let dist = Infinity
    // 	let nearest: [number, number] | false = false
    // 	for (let i = -1; i < vertices.length - 1; ++i) {
    // 		const polygonLineA = vertices[i < 0 ? vertices.length - 1 : i]
    // 		const polygonLineB = vertices[i + 1]
    // 		const c = geometry.nearestToSegment(p, polygonLineA, polygonLineB)
    // 		let cDist = vec.dist(p, c)
    // 		if (cDist < dist) {
    // 			dist = cDist
    // 			nearest = c
    // 		}
    // 	}
    // 	return nearest
    // },
    // pointIsInsidePolygon: (p: [number, number], vertices: [number, number][]) => {
    // 	let count = 0
    // 	const pb: [number, number] = [-1000000, p[1]]
    // 	for (let i = -1; i < vertices.length - 1; ++i) {
    // 		const polygonA = vertices[i < 0 ? vertices.length - 1 : i]
    // 		const polygonB = vertices[i + 1]
    // 		if (geometry.intersect(polygonA, polygonB, p, pb)) ++count
    // 	}
    // 	return count % 2 != 0
    // },
    // nearestToSegment(p: [number, number], a: [number, number], b: [number, number]) {
    // 	const v = vec.sub(b, a)
    // 	const u = ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / (v[0]*v[0] + v[1]*v[1])
    // 	const i = vec.add(a, vec.mult(v, u)) as [number, number]
    // 	if (u <= 0) return a
    // 	if (u >= 1) return b
    // 	return i
    // }
};
//# sourceMappingURL=geometry.js.map