// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NativeTypes } from "./consts";
import { NativeTypeDef } from "./utils";

interface TypedArray{
    readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBufferLike;
    readonly byteLength: number;
    readonly byteOffset: number;
    // new(view: DataView, byteOffset: number, length: number):TypedArray;
}
// interface TypedArrayConstructor<T extends number|BigInt> extends ArrayConstructor{
//     readonly prototype:TypedArray<T>;
//     readonly BYTES_PER_ELEMENT: number;
//     new(buffer: ArrayBufferLike, byteOffset?: number, length?: number): TypedArray<T>;
// }

// declare var TypedArray: TypedArrayConstructor<number|BigInt>;

class TypedArrayImpl<T extends number|BigInt> extends Array<T> implements TypedArray,ProxyHandler<Array<T>>{
    // static get BYTES_PER_ELEMENT():number{return this.prototype.BYTES_PER_ELEMENT;}
    static readonly BYTES_PER_ELEMENT:number;
    static readonly type:NativeTypes;
    readonly view:DataView;
    get BYTES_PER_ELEMENT():number{return (this.constructor as any).BYTES_PER_ELEMENT}
    get type():NativeTypes{return (this.constructor as any).type}
    get buffer():ArrayBufferLike{return this.view.buffer;}
    get byteLength():number{return this.BYTES_PER_ELEMENT*this.length;}
    constructor(view:DataView|ArrayBufferLike,public readonly byteOffset: number, length: number){
        super(length);
        if(!ArrayBuffer.isView(view)){
            view=new DataView(view,0,length*this.BYTES_PER_ELEMENT);
        }
        this.view=view;
        Object.freeze(this);
        return new Proxy(this,this);
    }
    get(target:TypedArrayImpl<T>,prop:PropertyKey,receiver:any):any{
        if(typeof prop=="string"&&isFinite(+prop)||typeof prop=="number"){
            const index=+prop;
            if(index>=target.length)
                return null;
            return NativeTypeDef[this.type].get(this.view,this.byteOffset+index*this.BYTES_PER_ELEMENT)
        }
        return target[prop];
    }
    set(target:TypedArrayImpl<T>,prop:PropertyKey,value:any,receiver:any):boolean{
        if(typeof prop=="string"&&isFinite(+prop)||typeof prop=="number"){
            const index=+prop;
            if(index>=target.length)
                return false;
            NativeTypeDef[this.type].set(this.view,this.byteOffset+index*this.BYTES_PER_ELEMENT,value);
            return true;
        }
        return true;
    }
}
export class Int8ArrayProxy extends TypedArrayImpl<number>{
    static BYTES_PER_ELEMENT: number=Int8Array.BYTES_PER_ELEMENT;
    static type:NativeTypes="int8";
}
export class Uint8ArrayProxy extends TypedArrayImpl<number>{
    static BYTES_PER_ELEMENT: number=Uint8Array.BYTES_PER_ELEMENT;
    static type:NativeTypes="uint8";
}
export class Int16ArrayProxy extends TypedArrayImpl<number>{
    static BYTES_PER_ELEMENT: number=Int16Array.BYTES_PER_ELEMENT;
    static type:NativeTypes="int16";
}
export class Uint16ArrayProxy extends TypedArrayImpl<number>{
    static BYTES_PER_ELEMENT: number=Uint16Array.BYTES_PER_ELEMENT;
    static type:NativeTypes= "uint16";
}
export class Int32ArrayProxy extends TypedArrayImpl<number>{
    static BYTES_PER_ELEMENT: number=Int32Array.BYTES_PER_ELEMENT;
    static type:NativeTypes="int32";
}
export class Uint32ArrayProxy extends TypedArrayImpl<BigInt>{
    static BYTES_PER_ELEMENT: number=Uint32Array.BYTES_PER_ELEMENT;
    static type:NativeTypes="uint32";
}
export class BigInt64ArrayProxy extends TypedArrayImpl<BigInt>{
    static BYTES_PER_ELEMENT: number=BigInt64Array.BYTES_PER_ELEMENT;
    static type:NativeTypes="int64";
}
export class BigUint64ArrayProxy extends TypedArrayImpl<BigInt>{
    static BYTES_PER_ELEMENT: number=BigUint64Array.BYTES_PER_ELEMENT;
    static type:NativeTypes="uint64";
}
export class Float32ArrayProxy extends TypedArrayImpl<number>{
    static BYTES_PER_ELEMENT: number=Float32Array.BYTES_PER_ELEMENT;
    static type:NativeTypes="float32";
}
export class Float64ArrayProxy extends TypedArrayImpl<number>{
    static BYTES_PER_ELEMENT: number=Float64Array.BYTES_PER_ELEMENT;
    static type:NativeTypes="float64";
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