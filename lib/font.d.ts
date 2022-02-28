export declare type TextureAtlasMap = {
    map: Map<string, {
        a: [number, number];
        b: [number, number];
    }>;
};
export declare type FontAtlas = {
    map: Map<string, {
        a: [number, number];
        b: [number, number];
        offset: [number, number];
        advance: number;
        kerning: Map<string, number>;
        height: number;
    }>;
};
export declare function loadFNT(url: string): Promise<FontAtlas>;
