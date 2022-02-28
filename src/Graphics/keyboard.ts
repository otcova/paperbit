import { KeyboardData } from "./interfaces";

export class PaperbitKeyboard implements KeyboardData {

	keys: Map<string, number> = new Map()
	typed: string = ""
	
	// private publishEvent
	constructor(cavnas: HTMLCanvasElement) {
		// this.publishEvent = publishEvent
		// bit.graphics.canvas.onkeydown = e => { this.updateKey(e); this.publishEvent("keyDown") }
		// bit.graphics.canvas.onkeyup = e => { this.updateKey(e); this.publishEvent("keyUp") }
	}

	private updateKey(e: KeyboardEvent) {
		// if ([...e.key].length === 1 && !e.ctrlKey && !e.metaKey) this.publishEvent("keyPress")
	}

	pullData(): KeyboardData {
		const data = { keys: this.keys, typed: this.typed }
		this.keys = new Map()
		this.typed = ""
		return data
	}
}