// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export enum META{
    VIEW,
    BASE,
    FIELD,
    SIZE,
    ALIGN,
}

export interface NativeTypeMap{
    int8:[number,Int8Array],
    uint8:[number,Uint8Array],
    int16:[number,Int16Array],
    uint16:[number,Uint16Array],
    int32:[number,Int32Array],
    uint32:[number,Uint32Array],
    int64:[BigInt,BigInt64Array],
    uint64:[BigInt,BigUint64Array],
    float32:[number,Float32Array],
    float64:[number,Float64Array],
}
export const NativeTypeClassMap={
    int8:Int8Array,
    uint8:Uint8Array,
    int16:Int16Array,
    uint16:Uint16Array,
    int32:Int32Array,
    uint32:Uint32Array,
    int64:BigInt64Array,
    uint64:BigUint64Array,
    float32:Float32Array,
    float64:Float64Array,
}
export const NativeTypeConventMap={
    int8:Number,
    uint8:Number,
    int16:Number,
    uint16:Number,
    int32:Number,
    uint32:Number,
    int64:BigInt,
    uint64:BigInt,
    float32:Number,
    float64:Number,
}

// export type NativeTypeMap=typeof NativeTypeClassMap;
export enum NativeTypeSize{
    int8=1,
    uint8=int8,
    int16=2,
    uint16=int16,
    int32=4,
    uint32=int32,
    int64=8,
    uint64=int64,
    float32=4,
    float64=8,
}
export enum NativeTypeNameMap{
    int8='Int8',
    uint8='Uint8',
    int16='Int16',
    uint16='Uint16',
    int32='Int32',
    uint32='Uint32',
    int64='BigInt64',
    uint64='BigUint64',
    float32='Float32',
    float64='Float64',
}
export type NativeTypes=keyof NativeTypeMap;

