export declare type eventCallback<dataType> = (data: dataType) => void | Promise<void>;
export declare class EventMng<names extends string, dataType> {
    private eventsCallbacks;
    subscribe(eventName: names, callback: eventCallback<dataType>): void;
    unsubscribe(eventName: names, callback: eventCallback<dataType>): void;
    publish(eventType: names, data: dataType): Promise<void>;
    private getEventCallbacksSet;
}
