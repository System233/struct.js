// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DefaultEndian, Endianness, NativeTypes, NativeTypeSize } from "./consts";
import { ReadAsString, WriteAsString } from "./string";
import { NativeTypeDef } from "./utils";

export interface ITypedArray extends ArrayBufferView{
    readonly buffer: ArrayBufferLike;
    readonly endian: Endianness;
    // new<T extends TypedArray>(view: ArrayBufferView|ArrayBufferLike, byteOffset: number, length: number, endian?:Endianness):T;
}
export class ArrayProxy<T> extends Array<T>{

}
export class TypedArray<T extends number|BigInt> extends ArrayProxy<T> implements ITypedArray,ProxyHandler<Array<T>>{
    static readonly type:NativeTypes;
    static get BYTES_PER_ELEMENT():number{return NativeTypeSize[this.type];};
    
    readonly view:DataView;
    readonly byteOffset: number;
    readonly endian:Endianness;

    get type():NativeTypes{return (Object.getPrototypeOf(this).constructor).type;}
    get BYTES_PER_ELEMENT():number{return (Object.getPrototypeOf(this).constructor).BYTES_PER_ELEMENT;}
    get buffer():ArrayBufferLike{return this.view.buffer;}
    get byteLength():number{return this.BYTES_PER_ELEMENT*this.length;}
    constructor(view:ArrayBufferView|ArrayBufferLike,byteOffset: number, length: number, endian?:Endianness){
        super(length);
        
        if(ArrayBuffer.isView(view)){
            if(view instanceof DataView){
                this.view=view;
            }else{
                this.view=new DataView(view.buffer,view.byteOffset,view.byteOffset);
            }
        }else{
            this.view=new DataView(view,0,view.byteLength);
        }
        this.byteOffset=byteOffset||0;
        this.endian=endian||DefaultEndian;
        Object.freeze(this);
        return new Proxy(this,this);
    }
    get(target:TypedArray<T>,prop:PropertyKey,receiver:any):any{
        if(typeof prop=="string"&&isFinite(+prop)||typeof prop=="number"){
            return NativeTypeDef[this.type].get(this.view,this.byteOffset+(+prop)*this.BYTES_PER_ELEMENT,this.endian);
        }
        return target[prop];
    }
    set(target:TypedArray<T>,prop:PropertyKey,value:any,receiver:any):boolean{
        if(typeof prop=="string"&&isFinite(+prop)||typeof prop=="number"){
            NativeTypeDef[this.type].set(this.view,this.byteOffset+(+prop)*this.BYTES_PER_ELEMENT,value,this.endian);
            return true;
        }
        target[prop]=value;
        return true;
    }
}
export class Int8ArrayProxy extends TypedArray<number>{
    static type:NativeTypes="int8";
}
export class Uint8ArrayProxy extends TypedArray<number>{
    static type:NativeTypes="uint8";
}
export class Int16ArrayProxy extends TypedArray<number>{
    static type:NativeTypes="int16";
}
export class Uint16ArrayProxy extends TypedArray<number>{
    static type:NativeTypes= "uint16";
}
export class Int32ArrayProxy extends TypedArray<number>{
    static type:NativeTypes="int32";
}
export class Uint32ArrayProxy extends TypedArray<BigInt>{
    static type:NativeTypes="uint32";
}
export class BigInt64ArrayProxy extends TypedArray<BigInt>{
    static type:NativeTypes="int64";
}
export class BigUint64ArrayProxy extends TypedArray<BigInt>{
    static type:NativeTypes="uint64";
}
export class Float32ArrayProxy extends TypedArray<number>{
    static type:NativeTypes="float32";
}
export class Float64ArrayProxy extends TypedArray<number>{
    static type:NativeTypes="float64";
}

export class StringArray extends ArrayProxy<string> implements ProxyHandler<StringArray>{
    constructor(private readonly buffer:ArrayBufferLike,
            private readonly byteOffset: number,
            private readonly byteLength: number,
            length: number,
            private readonly encoding?:string){
        super(length);
        Object.freeze(this);
        return new Proxy(this,this);
    }
    get(target:StringArray,prop:PropertyKey){
        if(typeof prop=="string"&&isFinite(+prop)||typeof prop=="number"){
            
            return ReadAsString(
                this.buffer,
                this.byteOffset+(+prop)*this.byteLength,
                this.byteLength,
                this.encoding);
        }
        if(prop in target){
            return target[prop];
        }
        return undefined;
    }
    set(target:StringArray,prop:PropertyKey,value:any):boolean{
        if(typeof prop=="string"&&isFinite(+prop)||typeof prop=="number"){
            WriteAsString(
                this.buffer,
                this.byteOffset+(+prop)*this.byteLength,
                this.byteLength,
                this.encoding,
                value);
            return true;
        }
        if(prop in target){
            target[prop]=value;
            return true;
        }
        return false;
    }
}

export const ProxyTypeClassMap={
    int8:Int8ArrayProxy,
    uint8:Uint8ArrayProxy,
    int16:Int16ArrayProxy,
    uint16:Uint16ArrayProxy,
    int32:Int32ArrayProxy,
    uint32:Uint32ArrayProxy,
    int64:BigInt64ArrayProxy,
    uint64:BigUint64ArrayProxy,
    float32:Float32ArrayProxy,
    float64:Float64ArrayProxy,
}