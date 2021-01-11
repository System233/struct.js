// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TypeBase, TypeOption } from "./common";
import { Endianness, META} from "./consts";
import { FieldOption, Fields, FiledType } from "./field";
import { GetMetaData, SetMetaData } from "./meta";
import { AddField,CreateStruct, InitStruct} from "./types";
import { IsCustomType, IsCustomTypeInstance, SetFieldDef, SetTypeDef } from "./utils";

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
        if(IsCustomTypeInstance(target)){
            SetFieldDef(target,propertyKey,option as FieldOption);
        }else if(IsCustomType(target)){
            SetTypeDef(target,option as TypeOption);
        }
    });
}
// interface OptionSetter{
//     <K extends keyof TypeOption>(target:typeof TypeBase,name:K,def:TypeOption[K]):void;
//     <K extends keyof TypeOption>(target:TypeOption[K],name:K,def:TypeOption[K]):<T extends typeof TypeBase>(target:T)=>void;
//     <K extends keyof FieldOption>(target:TypeBase,propertyKey:PropertyKey,name:K,def:FieldOption[K]):void;
//     <K extends keyof FieldOption>(target:FieldOption[K],propertyKey:PropertyKey,name:K,def:FieldOption[K]):<T extends TypeBase>(target:T,propertyKey: string | symbol)=>void;
// };
// const SetOption2:OptionSetter=null;
interface OptionSetter<T>{
    (value:T):(target:TypeBase|typeof TypeBase,propertyKey?:PropertyKey)=>void;
    (target:TypeBase|typeof TypeBase):void;
}
const SetOption2=<T>(target:TypeBase|typeof TypeBase|T[typeof name],propertyKey:PropertyKey,name:keyof T ,def:T[typeof name])=>{
    if(IsCustomType(target)){
        SetTypeDef(target,{[name]:def});
    }else if(IsCustomTypeInstance(target)){
        SetFieldDef(target,propertyKey,{[name]:def});
        
    }else{
        return SetOption({[name]:target});
    }
    
}
export const Packed:OptionSetter<boolean>=(target,propertyKey?:PropertyKey)=>SetOption2<TypeOption>(target,propertyKey,"packed",true);
export const Native:OptionSetter<boolean>=(target,propertyKey?:PropertyKey)=>SetOption2<TypeOption&FieldOption>(target,propertyKey,"native",true);
export const Aligned=(aligned:number)=>SetOption({aligned});
export const Encoding=(encoding:string)=>SetOption({encoding});
export const Endian=(endian:Endianness)=>SetOption({endian});
export const Offset=(offset:number)=>SetOption({offset});
// export const Native=(native:boolean)=>SetOption({native});
export const Size=(size:number)=>SetOption({size});
export const Shape=(...shape:number[])=>SetOption({shape});
export const Length=Shape;
export const BigEndian=<T extends TypeBase>(target:T,propertyKey: string | symbol)=>SetFieldDef(target,propertyKey,{encoding:'BE'});
export const LittleEndian=<T extends TypeBase>(target:T,propertyKey: string | symbol)=>SetFieldDef(target,propertyKey,{encoding:'LE'});


export const Struct:{
    <T extends typeof TypeBase>(constructor:T,type?:TypeOption):T;
    (type:TypeOption):<T extends typeof TypeBase>(target:T)=>T;
}=(constructor,type?:TypeOption)=>{
    if(IsCustomType(constructor)){
        return ((type)=>{
            InitStruct(type);
            return type as any;
        })(class extends constructor {
            constructor(...args){
                super(...args);
                return CreateStruct(this);
            }
        });
        
        // SetMetaData(anonymous,META.RAW_TYPE,constructor);
        // return anonymous;
    }else if(typeof constructor=="object"){
        return <T extends typeof TypeBase>(target:T)=> Struct(target,type);
    }
}