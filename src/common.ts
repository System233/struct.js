// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Endianness, META } from "./consts";
import { SetMetaData } from "./meta";
import { CreateStruct } from "./types";
import { Dump, GetBuffer, SizeOf } from "./utils";

export interface TypeDef{
    aligned:number;
    packed:boolean;
    endian:Endianness;
    encoding:string;
}
export type TypeOption=Partial<TypeDef>;

export class TypeBase{
    // private static __typeguard;
    constructor(view?:ArrayBufferView|ArrayBufferLike,base?:number){
        if(view==null){
            view=new ArrayBuffer(SizeOf(this));
        }
        if(!(view instanceof DataView)){
            if(ArrayBuffer.isView(view)){
                view=new DataView(view.buffer,view.byteOffset,view.byteLength);
            }else{
                view=new DataView(view,0,view.byteLength);
            }
        }
        
        SetMetaData(this,META.VIEW,view);
        SetMetaData(this,META.BASE,base||0);

    }
    get buffer(){
        return GetBuffer(this);
    }
    static create<T extends typeof TypeBase>(this:T,...args:ConstructorParameters<T>){
        return CreateStruct(this,...args);
    }
    static dump(){
        return Dump(this);
    }
}
