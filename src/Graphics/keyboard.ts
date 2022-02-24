import { Paperbit } from "./paperbit";

export type keyboardEventsNames = "keyPress" | "keyDown" | "keyUp"

export class PaperbitKeyboard {
	private publishEvent
	constructor(bit: Paperbit, publishEvent: (name: keyboardEventsNames) => void) {
		this.publishEvent = publishEvent
		bit.graphics.canvas.onkeydown = e => { this.updateKey(e); this.publishEvent("keyDown") }
		bit.graphics.canvas.onkeyup = e => { this.updateKey(e); this.publishEvent("keyUp") }
	}

	private updateKey(e: KeyboardEvent) {
		if ([...e.key].length === 1 && !e.ctrlKey && !e.metaKey) this.publishEvent("keyPress")
	}
}