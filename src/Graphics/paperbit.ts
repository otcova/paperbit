import { canvasEventName, Graphics } from "./graphics";
import { Frame } from "./eventLoop";
import { keyboardEventsNames as keyboardEventName, PaperbitKeyboard } from "./keyboard";
import { mouseEventName, PaperbitMouse } from "./mouse";
import { eventCallback, EventMng } from "./eventsMng";
import { GraphicsAPI } from "./api/graphicsAPI";


type eventLoopName = "setup" | "draw" | "postDraw"

type eventName =
	canvasEventName |
	eventLoopName |
	mouseEventName |
	keyboardEventName


export class Paperbit extends GraphicsAPI {

	protected paperbit: Paperbit = this;

	graphics: Graphics
	mouse: PaperbitMouse
	keyboard: PaperbitKeyboard

	frame: Frame

	private publishEvent
	private eventMng = new EventMng<eventName, Paperbit>()

	constructor(container: HTMLElement = document.body) {
		super()

		this.publishEvent = (name: eventName) => this.eventMng.publish(name, this)

		this.graphics = new Graphics(this.paperbit, this.publishEvent, container)
		this.mouse = new PaperbitMouse(this, this.publishEvent)
		this.keyboard = new PaperbitKeyboard(this, this.publishEvent)
		this.frame = new Frame(this.paperbit)

		setTimeout(() => this.publishEvent("setup").then(this.draw.bind(this)), 0)
	}

	protected async draw() {
		await this.publishEvent("draw")
		await this.publishEvent("postDraw")
		requestAnimationFrame(this.draw.bind(this))
	}

	on(eventName: eventName, callback: eventCallback<Paperbit>) {
		this.eventMng.subscribe(eventName, callback)
	}
	unsubscribeEvent(eventName: eventName, callback: eventCallback<Paperbit>) {
		this.eventMng.unsubscribe(eventName, callback)
	}

}

