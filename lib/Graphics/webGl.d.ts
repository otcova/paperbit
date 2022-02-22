export declare class GLVao {
    gl: WebGL2RenderingContext;
    id: WebGLVertexArrayObject;
    constructor(gl: WebGL2RenderingContext);
    use(): this;
}
declare type uniformValue = number | [number] | [number, number] | [number, number, number] | [number, number, number, number];
export declare class GLProgram {
    #private;
    gl: WebGL2RenderingContext;
    id: WebGLProgram;
    constructor(gl: WebGL2RenderingContext, vertexShaderSource: string, fragmentShaderSource: string);
    delete(): void;
    getUniformLoc(name: WebGLUniformLocation | string): WebGLUniformLocation | null;
    getAttribLoc(name: number | string): number;
    use(uniforms?: [WebGLUniformLocation | string, uniformValue][]): void;
    setUniform(name: WebGLUniformLocation | string, value: uniformValue): void;
    setMatAttrib(name: number | string, matDimensions: number, stride?: number | null, offset?: number): {
        divisor: () => void;
    };
    setAttribs(...attribs: [string | number, number, "i"?][]): void;
    private setVecAttrib;
}
export declare class GLBuffer {
    #private;
    gl: WebGL2RenderingContext;
    dynamic: boolean;
    id: WebGLBuffer;
    glReservedSize: number;
    size: number;
    constructor(gl: WebGL2RenderingContext, dynamic?: boolean);
    bind(): void;
    update(buffer: Float32Array | ArrayBuffer | SharedArrayBuffer, size?: number): void;
}
interface GLTextureConfigInterface {
    mipmap?: boolean;
    minFilter?: "linear" | "nearest";
    magFilter?: "linear" | "nearest";
    wrapX?: "clamp" | "repeat" | "mirror";
    wrapY?: "clamp" | "repeat" | "mirror";
}
declare abstract class GLTextureConfig implements GLTextureConfigInterface {
    protected abstract gl: WebGL2RenderingContext;
    mipmap: boolean;
    minFilter: "linear" | "nearest";
    magFilter: "linear" | "nearest";
    wrapX: "clamp" | "repeat" | "mirror";
    wrapY: "clamp" | "repeat" | "mirror";
    constructor(data?: GLTextureConfigInterface);
    protected setConfig(): void;
    private glWrap;
    private glMinFilter;
    private glMagFilter;
}
export declare class GLTexture extends GLTextureConfig {
    protected gl: WebGL2RenderingContext;
    private id;
    private loadPromise;
    size: [number, number];
    slot: number;
    constructor(gl: WebGL2RenderingContext, slot: number | undefined, url: string, config?: GLTextureConfigInterface);
    onLoad(callback?: (texture: GLTexture) => {}): Promise<void>;
    use(): void;
    private setDefaultImage;
}
export {};
