export declare class SmoothBit {
    duration: number;
    zero: number;
    one: number;
    private t0;
    private target;
    constructor(zero?: number, one?: number, duration?: number);
    set(value: boolean): this;
    get(zero?: number, one?: number): number;
    private get currenTime();
}
