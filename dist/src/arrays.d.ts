import { NativeTypes } from "./consts";
interface TypedArray {
    readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBufferLike;
    readonly byteLength: number;
    readonly byteOffset: number;
}
declare class TypedArrayImpl<T extends number | BigInt> extends Array<T> implements TypedArray, ProxyHandler<Array<T>> {
    readonly byteOffset: number;
    static readonly BYTES_PER_ELEMENT: number;
    static readonly type: NativeTypes;
    readonly view: DataView;
    get BYTES_PER_ELEMENT(): number;
    get type(): NativeTypes;
    get buffer(): ArrayBufferLike;
    get byteLength(): number;
    constructor(view: DataView | ArrayBufferLike, byteOffset: number, length: number);
    get(target: TypedArrayImpl<T>, prop: PropertyKey, receiver: any): any;
    set(target: TypedArrayImpl<T>, prop: PropertyKey, value: any, receiver: any): boolean;
}
export declare class Int8ArrayProxy extends TypedArrayImpl<number> {
    static BYTES_PER_ELEMENT: number;
    static type: NativeTypes;
}
export declare class Uint8ArrayProxy extends TypedArrayImpl<number> {
    static BYTES_PER_ELEMENT: number;
    static type: NativeTypes;
}
export declare class Int16ArrayProxy extends TypedArrayImpl<number> {
    static BYTES_PER_ELEMENT: number;
    static type: NativeTypes;
}
export declare class Uint16ArrayProxy extends TypedArrayImpl<number> {
    static BYTES_PER_ELEMENT: number;
    static type: NativeTypes;
}
export declare class Int32ArrayProxy extends TypedArrayImpl<number> {
    static BYTES_PER_ELEMENT: number;
    static type: NativeTypes;
}
export declare class Uint32ArrayProxy extends TypedArrayImpl<BigInt> {
    static BYTES_PER_ELEMENT: number;
    static type: NativeTypes;
}
export declare class BigInt64ArrayProxy extends TypedArrayImpl<BigInt> {
    static BYTES_PER_ELEMENT: number;
    static type: NativeTypes;
}
export declare class BigUint64ArrayProxy extends TypedArrayImpl<BigInt> {
    static BYTES_PER_ELEMENT: number;
    static type: NativeTypes;
}
export declare class Float32ArrayProxy extends TypedArrayImpl<number> {
    static BYTES_PER_ELEMENT: number;
    static type: NativeTypes;
}
export declare class Float64ArrayProxy extends TypedArrayImpl<number> {
    static BYTES_PER_ELEMENT: number;
    static type: NativeTypes;
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
export {};
