import { Endianness } from "./consts";
export interface TypeDef {
    aligned: number;
    packed: boolean;
    endian: Endianness;
    encoding: string;
}
export declare type TypeOption = Partial<TypeDef>;
export declare class TypeBase {
    private static __typeguard;
    constructor(view?: ArrayBufferView | ArrayBufferLike, base?: number);
    static dump(ident?: number, deep?: number): string;
}
//# sourceMappingURL=common.d.ts.map