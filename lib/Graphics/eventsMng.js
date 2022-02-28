"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventMng = void 0;
class EventMng {
    constructor() {
        this.eventsCallbacks = new Map();
    }
    subscribe(eventName, callback) {
        this.getEventCallbacksSet(eventName).add(callback);
    }
    unsubscribe(eventName, callback) {
        this.getEventCallbacksSet(eventName).delete(callback);
    }
    async publish(eventType, data) {
        for (const callback of this.getEventCallbacksSet(eventType))
            await callback(data);
    }
    getEventCallbacksSet(eventName) {
        let set = this.eventsCallbacks.get(eventName);
        if (set)
            return set;
        this.eventsCallbacks.set(eventName, set = new Set());
        return set;
    }
}
exports.EventMng = EventMng;
//# sourceMappingURL=eventsMng.js.map