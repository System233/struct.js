import { Endianness } from "./consts";
export interface TypeDef {
    aligned: number;
    packed: boolean;
    endian: Endianness;
    encoding: string;
}
export declare type TypeOption = Partial<TypeDef>;
export declare class TypeBase {
    constructor(view?: ArrayBufferView | ArrayBufferLike, base?: number);
    get buffer(): Uint8Array;
    static create<T extends typeof TypeBase>(this: T, ...args: ConstructorParameters<T>): InstanceType<T>;
    static dump(): string;
}
//# sourceMappingURL=common.d.ts.map