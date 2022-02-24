
export type eventCallback<dataType> = (data: dataType) => void | Promise<void>;


export class EventMng<names extends string, dataType> {
	
	private eventsCallbacks: Map<names, Set<eventCallback<dataType>>> = new Map()
	
	subscribe(eventName: names, callback: eventCallback<dataType>) {
		this.getEventCallbacksSet(eventName).add(callback)
	}
	
	unsubscribe(eventName: names, callback: eventCallback<dataType>) {
		this.getEventCallbacksSet(eventName).delete(callback)
	}
	
	async publish(eventType: names, data: dataType) {
		for (const callback of this.getEventCallbacksSet(eventType))
			await callback(data)
	}
	
	private getEventCallbacksSet(eventName: names) {
		let set = this.eventsCallbacks.get(eventName)
		if (set) return set
		this.eventsCallbacks.set(eventName, set = new Set())
		return set
	}
}