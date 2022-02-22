export declare class Smooth {
    past: number;
    target: number;
    t0: number;
    t2: number;
    constructor(defaultValue: number);
    goto(value: number, t2?: number): this;
    get(): number;
}
