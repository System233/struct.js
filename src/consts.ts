// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export enum META{
    VIEW,
    BASE,
    FIELD,
    SIZE,
    REAL_SIZE,
    INITED,
    OPTION,
    ALIGN
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
    int8=Int8Array.BYTES_PER_ELEMENT,
    uint8=Uint8Array.BYTES_PER_ELEMENT,
    int16=Int16Array.BYTES_PER_ELEMENT,
    uint16=Uint16Array.BYTES_PER_ELEMENT,
    int32=Int32Array.BYTES_PER_ELEMENT,
    uint32=Uint32Array.BYTES_PER_ELEMENT,
    int64=BigInt64Array.BYTES_PER_ELEMENT,
    uint64=BigUint64Array.BYTES_PER_ELEMENT,
    float32=Float32Array.BYTES_PER_ELEMENT,
    float64=Float64Array.BYTES_PER_ELEMENT,
}

export type NativeType=keyof NativeTypeMap;
export type StringType="string";

export type Endianness="LE"|"BE";
export const DefaultEndian:Endianness=(()=>{
    const testBuf=new ArrayBuffer(2);
    const u8array=new Uint8Array(testBuf);
    const u16array=new Uint16Array(testBuf);
    u16array[0]=0x0102;
    return (u8array[0]>u8array[1])?"LE":"BE";
})();
export const DefaultEncoding="utf-8";