export declare enum META {
    VIEW = 0,
    BASE = 1,
    FIELD = 2,
    SIZE = 3,
    REAL_SIZE = 4,
    INITED = 5,
    OPTION = 6,
    ALIGN = 7
}
export interface NativeTypeMap {
    int8: [number, Int8Array];
    uint8: [number, Uint8Array];
    int16: [number, Int16Array];
    uint16: [number, Uint16Array];
    int32: [number, Int32Array];
    uint32: [number, Uint32Array];
    int64: [BigInt, BigInt64Array];
    uint64: [BigInt, BigUint64Array];
    float32: [number, Float32Array];
    float64: [number, Float64Array];
}
export declare const NativeTypeClassMap: {
    int8: Int8ArrayConstructor;
    uint8: Uint8ArrayConstructor;
    int16: Int16ArrayConstructor;
    uint16: Uint16ArrayConstructor;
    int32: Int32ArrayConstructor;
    uint32: Uint32ArrayConstructor;
    int64: BigInt64ArrayConstructor;
    uint64: BigUint64ArrayConstructor;
    float32: Float32ArrayConstructor;
    float64: Float64ArrayConstructor;
};
export declare const NativeTypeConventMap: {
    int8: NumberConstructor;
    uint8: NumberConstructor;
    int16: NumberConstructor;
    uint16: NumberConstructor;
    int32: NumberConstructor;
    uint32: NumberConstructor;
    int64: BigIntConstructor;
    uint64: BigIntConstructor;
    float32: NumberConstructor;
    float64: NumberConstructor;
};
export declare enum NativeTypeSize {
    int8,
    uint8,
    int16,
    uint16,
    int32,
    uint32,
    int64,
    uint64,
    float32,
    float64
}
export declare type NativeType = keyof NativeTypeMap;
export declare type StringType = "string";
export declare type Endianness = "LE" | "BE";
export declare const DefaultEndian: Endianness;
export declare const DefaultEncoding = "utf-8";
//# sourceMappingURL=consts.d.ts.map