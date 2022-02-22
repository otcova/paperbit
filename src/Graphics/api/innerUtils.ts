export function setColor(buffer: [number, number, number, number] | number[], newColor: number[] | number) {
	if (typeof newColor == "number") {
		buffer[0] = newColor
		buffer[1] = newColor
		buffer[2] = newColor
		buffer[3] = 1
		return buffer
	}
	buffer[0] = newColor[0]
	switch (newColor.length) {
		case 1:
			buffer[1] = newColor[0]
			buffer[2] = newColor[0]
			buffer[3] = 1
			return buffer
		case 2:
			buffer[1] = newColor[0]
			buffer[2] = newColor[0]
			buffer[3] = newColor[1]
			return buffer
		case 3:
			buffer[1] = newColor[1]
			buffer[2] = newColor[2]
			buffer[3] = 1
			return buffer
		case 4:
			buffer[1] = newColor[1]
			buffer[2] = newColor[2]
			buffer[3] = newColor[3]
	}
	return buffer
}

export class PushBuffer {

	f32: Float32Array
	buffer: ArrayBuffer
	BufferConstructor: ArrayBufferConstructor | SharedArrayBufferConstructor
	size: number

	constructor(reserve = 1024, BufferConstructor = ArrayBuffer) {
		this.BufferConstructor = BufferConstructor
		this.size = 0
		this.buffer = new this.BufferConstructor(reserve)
		this.f32 = new Float32Array(this.buffer)
	}
	push(data: number[]) {
		if (this.buffer.byteLength / Float32Array.BYTES_PER_ELEMENT <= this.size + data.length) this.#resize(2 * (this.size + data.length))
		this.f32.set(data, this.size)
		this.size += data.length
	}
	clear() {
		this.size = 0
		return this.buffer
	}
	#resize(newSize: number) {
		const pastArray = this.f32
		this.buffer = new this.BufferConstructor(newSize * Float32Array.BYTES_PER_ELEMENT)
		this.f32 = new Float32Array(this.buffer)
		if (pastArray) this.f32.set(pastArray, 0)
	}
}