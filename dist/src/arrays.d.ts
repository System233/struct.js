import { Endianness, NativeType } from "./consts";
export interface ITypedArray extends ArrayBufferView {
    readonly buffer: ArrayBufferLike;
    readonly endian: Endianness;
}
export declare class ArrayProxy<T> extends Array<T> {
}
export declare class TypedArray<T extends number | BigInt> extends ArrayProxy<T> implements ITypedArray, ProxyHandler<Array<T>> {
    static readonly type: NativeType;
    static get BYTES_PER_ELEMENT(): number;
    readonly view: DataView;
    readonly byteOffset: number;
    readonly endian: Endianness;
    get type(): NativeType;
    get BYTES_PER_ELEMENT(): number;
    get buffer(): ArrayBufferLike;
    get byteLength(): number;
    constructor(view: ArrayBufferView | ArrayBufferLike, byteOffset: number, length: number, endian?: Endianness);
    get(target: TypedArray<T>, prop: PropertyKey, receiver: any): any;
    set(target: TypedArray<T>, prop: PropertyKey, value: any, receiver: any): boolean;
}
export declare class Int8ArrayProxy extends TypedArray<number> {
    static type: NativeType;
}
export declare class Uint8ArrayProxy extends TypedArray<number> {
    static type: NativeType;
}
export declare class Int16ArrayProxy extends TypedArray<number> {
    static type: NativeType;
}
export declare class Uint16ArrayProxy extends TypedArray<number> {
    static type: NativeType;
}
export declare class Int32ArrayProxy extends TypedArray<number> {
    static type: NativeType;
}
export declare class Uint32ArrayProxy extends TypedArray<BigInt> {
    static type: NativeType;
}
export declare class BigInt64ArrayProxy extends TypedArray<BigInt> {
    static type: NativeType;
}
export declare class BigUint64ArrayProxy extends TypedArray<BigInt> {
    static type: NativeType;
}
export declare class Float32ArrayProxy extends TypedArray<number> {
    static type: NativeType;
}
export declare class Float64ArrayProxy extends TypedArray<number> {
    static type: NativeType;
}
export declare class StringArray extends ArrayProxy<string> implements ProxyHandler<StringArray> {
    private readonly buffer;
    private readonly byteOffset;
    private readonly byteLength;
    private readonly encoding?;
    constructor(buffer: ArrayBufferLike, byteOffset: number, byteLength: number, length: number, encoding?: string);
    has(target: StringArray, p: PropertyKey): boolean;
    get(target: StringArray, prop: PropertyKey): any;
    set(target: StringArray, prop: PropertyKey, value: any): boolean;
}
export declare const ProxyTypeClassMap: {
    int8: typeof Int8ArrayProxy;
    uint8: typeof Uint8ArrayProxy;
    int16: typeof Int16ArrayProxy;
    uint16: typeof Uint16ArrayProxy;
    int32: typeof Int32ArrayProxy;
    uint32: typeof Uint32ArrayProxy;
    int64: typeof BigInt64ArrayProxy;
    uint64: typeof BigUint64ArrayProxy;
    float32: typeof Float32ArrayProxy;
    float64: typeof Float64ArrayProxy;
};
//# sourceMappingURL=arrays.d.ts.map