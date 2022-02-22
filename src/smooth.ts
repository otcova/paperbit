export class Smooth {
	
	past: number
	target: number
	t0: number = -Infinity
	t2: number = 0
	
	constructor(defaultValue: number) {
		this.past = defaultValue
		this.target = defaultValue
	}
	
	goto(value: number, t2: number = 0.1) {
		this.t2 = t2
		this.past = this.get()
		this.target = value
		this.t0 = performance.now() / 1000
		return this
	}
	
	get() {
		const now = performance.now() / 1000 - this.t0
		if (now > this.t2) return this.target
		return this.past + (this.target - this.past) * now / this.t2
	}
}

// export class Smooth {
	
// 	past: number
// 	target: number
// 	t0: number = 0
// 	v: number = 1
	
// 	constructor(defaultValue: number = 0) {
// 		this.past = defaultValue
// 		this.target = defaultValue
// 	}
	
// 	goto(target: number, v: number = 1) {
// 		this.past = this.get()
// 		this.v = Math.abs(v) * Math.sign(target - this.past)
// 		this.target = target
// 		this.t0 = performance.now() / 1000
// 		return this
// 	}
	
// 	get() {
// 		const now = performance.now() / 1000 - this.t0
// 		const x1 = this.past + this.v * now
// 		if (this.past <= this.target && this.target <= x1) return this.target
// 		if (x1 <= this.target && this.target <= this.past) return this.target
// 		return x1
// 	}
// }