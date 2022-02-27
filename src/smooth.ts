export class SmoothBit {

	duration: number
	zero: number
	one: number

	private t0 = 0
	private target = false

	constructor(zero = 0, one = 1, duration: number = 1/4) {
		this.duration = duration
		this.zero = zero
		this.one = one
		this.t0 = this.currenTime
	}
	set(value: boolean) {
		if (this.target != value) {
			this.target = value
			const dt = (this.currenTime - this.t0) / this.duration
			if (dt > 1) this.t0 = this.currenTime
			else this.t0 = this.currenTime - (1 - dt)
		}
		return this
	}

	get(zero?: number, one?: number) {
		zero ??= this.zero
		one ??= this.one

		const dt = (this.currenTime - this.t0) / this.duration
		if (dt >= 1) return this.target ? this.one : this.zero
		let x = easeInOutSine(dt)
		if (!this.target) x = 1 - x
		x = zero + x * (one - zero)
		return x
	}

	private get currenTime() {
		return performance.now() / 1000
	}
}

function easeInOutSine(x: number): number {
	return -(Math.cos(Math.PI * x) - 1) / 2;
}