// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TypeBase, TypeOption } from "./common";
import { Endianness, META} from "./consts";
import { FieldOption, Fields, FiledType } from "./field";
import { GetMetaData, SetMetaData } from "./meta";
import { AddField,CreateStruct, InitStruct} from "./types";
import { IsCustomType, SetFieldDef, SetTypeDef } from "./utils";

export const Field= <T extends FiledType>(type:T,option?:Partial<FieldOption&{type:T}>):PropertyDecorator=>{
    return <T extends TypeBase>(target: T, propertyKey: string | symbol):void=>SetFieldDef(target,propertyKey,
        {
            name:propertyKey,
            type,
            ...option as any||{}
        });
}

export const SetOption:{
    (option:TypeOption&FieldOption):(target:TypeBase|typeof TypeBase,propertyKey?: string | symbol)=>void;
    (option:TypeOption):<T extends typeof TypeBase>(target:T)=>void;
    (option:FieldOption):<T extends TypeBase>(target:T,propertyKey: string | symbol)=>void;
}=(option:TypeOption|FieldOption)=>{
    return (<T extends (typeof TypeBase|TypeBase)>(target:T, propertyKey?: string | symbol):void=>{
        if(propertyKey!=null){
            SetFieldDef(target,propertyKey,option as FieldOption);
        }else{
            SetTypeDef(target,option as TypeOption);
        }
    });
}
export const Aligned=(aligned:number)=>SetOption({aligned});
export const Encoding=(encoding:string)=>SetOption({encoding});
export const Endian=(endian:Endianness)=>SetOption({endian});
export const Offset=(offset:number)=>SetOption({offset});
export const Native=(native:boolean)=>SetOption({native});
export const Size=(size:number)=>SetOption({size});
export const Shape=(...shape:number[])=>SetOption({shape});
export const Length=Shape;
export const BigEndian=<T extends TypeBase>(target:T,propertyKey: string | symbol)=>SetFieldDef(target,propertyKey,{encoding:'BE'});
export const LittleEndian=<T extends TypeBase>(target:T,propertyKey: string | symbol)=>SetFieldDef(target,propertyKey,{encoding:'LE'});

export const Struct:{
    <T extends typeof TypeBase>(constructor:T,type?:TypeOption):T;
    (type:TypeOption):ClassDecorator;
}=<T extends typeof TypeBase|TypeOption>(constructor:T,type?:TypeOption)=>{
    if(IsCustomType(constructor)){
        return ((type:T)=>{
            InitStruct(type);
            return type;
        })(class extends (constructor as any) {
            constructor(...args){
                super(...args);
                return CreateStruct(this);
            }
        } as T);
        
        // SetMetaData(anonymous,META.RAW_TYPE,constructor);
        // return anonymous;
    }else if(typeof constructor=="object"){
        return <T extends typeof TypeBase>(target:T)=> Struct(target,type);
    }
}