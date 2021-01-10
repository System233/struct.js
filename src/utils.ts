// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { type } from "os";
import { ArrayProxy } from "./arrays";
import { TypeBase, TypeDef, TypeOption } from "./common";
import { DefaultEndian, Endianness, META, NativeTypeConventMap, NativeTypeMap, NativeType, NativeTypeSize, StringType } from "./consts";
import { FieldDef, FieldNativeDef, FieldOption, Fields, FieldStringDef, FieldTypeDef } from "./field";
import { GetMetaData, SetMetaData } from "./meta";
import { AddField } from "./types";
enum NativeTypeNameMap{
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
export function GetNativeTypeDef<T extends keyof NativeTypeMap>(type:T){
    const name=NativeTypeNameMap[type];
    const getter=`get${name}`;
    const setter=`set${name}`;
    return {
        get(view:DataView,offset:number,endian?:Endianness){
            
            if(endian==null)
                endian=DefaultEndian;
            return view[getter](offset,endian=="LE");
        },
        set(view:DataView,offset:number,value:NativeTypeMap[T][0],endian?:Endianness){
            if(endian==null)
                endian=DefaultEndian;
            view[setter](offset,NativeTypeConventMap[type](value),endian=="LE");
        },
    }
}
export const NativeTypeDef={
    int8:GetNativeTypeDef('int8'),
    uint8:GetNativeTypeDef('uint8'),
    int16:GetNativeTypeDef('int16'),
    uint16:GetNativeTypeDef('uint16'),
    int32:GetNativeTypeDef('int32'),
    uint32:GetNativeTypeDef('uint32'),
    int64:GetNativeTypeDef('int64'),
    uint64:GetNativeTypeDef('uint64'),
    float32:GetNativeTypeDef('float32'),
    float64:GetNativeTypeDef('float64'),
}

export const IsNativeType=(type:any):type is NativeType=>{
    return type in NativeTypeNameMap;
}
export const IsNativeField=(field:FieldDef|FieldOption):field is FieldNativeDef=>{
    return IsNativeType(field.type);
}
export const IsCustomType=(type:any):type is typeof TypeBase=>{
    return typeof type=="function"&&type.prototype instanceof TypeBase;
}
export const IsCustomField=(field:FieldDef|FieldOption):field is FieldTypeDef=>{
    return IsCustomType(field.type);
}
export const IsStringType=(type:any):type is StringType=>{
    return type=="string";
}
export const IsStringField=(field:FieldDef|FieldOption):field is FieldStringDef=>{
    return IsStringType(field.type);
}


export const SizeOf=(type:typeof TypeBase|TypeBase|NativeType,real?:boolean):number=>{
    if(IsCustomType(type)){
        return SizeOf(type.prototype,real);
    }
    if(IsNativeType(type)){
        return NativeTypeSize[type];
    }
    if(IsStringType(type)){
        return 1;
    }
    if(type instanceof TypeBase){
        return GetMetaData<number>(type,real?META.REAL_SIZE:META.SIZE,0);
    }
    return undefined;
}

export const DeepAssign=<T extends Object>(target:T,...args:object[]):T=>{
    args.filter(x=>x!=null).forEach(form=>{
        Object.entries(form).forEach(([key,val])=>{
            if(key in target){
                const current=target[key];
                if(typeof current=="object"&&typeof val=="object"){
                    DeepAssign(current,val);
                }else if(Object.getOwnPropertyDescriptor(target,key).writable){
                    target[key]=val;
                }
            }else{
                target[key]=val;
            }
        })
    });
    return target;
}
export const TypeToCpp=(type:NativeType|typeof TypeBase|StringType)=>{
    if(IsCustomType(type))
        return type.name;
    if(IsNativeType(type))
        return `${type}_t`;
    if(IsStringType(type))
        return 'char';
    return null;
}
export const DumpField=(field:FieldDef,deep?:number):string=>{
    deep=deep||0;
    const dumpShape=(shape)=>shape?shape.map(x=>`[${x}]`).join(''):'';
    const dumpInfo=()=>{
        const array=[`+0x${field.offset.toString(16).toUpperCase()}`,`${field.size}`];
        if(field.encoding!=null)
            array.push(`${field.encoding}`);
        if(field.native!=null)
            array.push(`native`);
        return array.join(', ')
    };
    const pad=Array(deep+1).join('\t');
    if(IsNativeField(field)||IsStringField(field)){
        const {type,name,shape}=field;
        return `${pad}${TypeToCpp(type)}\t${name as any}${dumpShape(shape)};\t//${dumpInfo()}\n`
    }
    else if(IsCustomField(field)){
        const {type,name,shape}=field;
        return `${pad}${type.name}\t${name as any}${dumpShape(shape)};\t//${dumpInfo()}\n`
    }
    return null;
}
export const DumpType=<T extends typeof TypeBase|TypeBase>(type:T):string=>{
    if(typeof type=="function")
        type=type.prototype;
    const fields=GetTypeFields(type);
    const size=SizeOf(type);
    const align=GetMetaData<number>(type,META.ALIGN);
    return `struct ${type.constructor.name}{\t//${size}, align=${align}\n${Array.from(fields.values(),field=>DumpField(field,1)).join('')}}__attribute__((aligned(${align})));`;
}
export const Dump=<T extends typeof TypeBase|TypeBase|FieldDef>(type:T):string=>{
    if(typeof type=="function"&&type.prototype instanceof TypeBase||type instanceof TypeBase){
        return DumpType(type);
    }
    return DumpField(type as any,0);
}
//1,4->4
//2,4->4
//5,4->8
export const Aligns=(addr:number,align:NativeTypeSize)=>(addr+align-1)&(~(align-1));

export const GetTypeDef=<T extends TypeBase>(target:T)=>GetMetaData<TypeDef>(target,META.OPTION);
export const SetTypeDef=<T extends TypeBase>(target:T,option:TypeOption)=>{
    const value=GetMetaData<TypeOption>(target,META.OPTION,{});
    Object.assign(value,option);
    SetMetaData<TypeOption>(target,META.OPTION,value);
}

export const GetFieldDef=<T extends TypeBase>(target:T,name:PropertyKey)=>{
    const fields=GetMetaData<Fields>(target,META.FIELD);
    if(fields&&fields.has(name))
        return fields.get(name);
    return null;
};

export const SetFieldDef=<T extends TypeBase>(target:T,name:PropertyKey,option:FieldOption)=>{
    const fields=GetMetaData<Fields>(target,META.FIELD,new Map);
    if(fields.has(name)){
        Object.assign(fields.get(name),option);
    }else{
        fields.set(name,option as FieldDef);
        SetMetaData(target,META.FIELD,fields);
    }
}
export const GetDefaultAlign=(type:typeof TypeBase|NativeType|StringType):number=>{
    if(IsCustomType(type)){
        const {aligned: align}=GetMetaData<TypeOption>(type,META.OPTION,{});
        return NullOrDef(align,1);
    }else{
        return SizeOf(type);
    }
}
export const SetDefaultAlign=(type:typeof TypeBase,align:number):boolean=>{
    if(IsCustomType(type)){
        const option=GetMetaData<TypeOption>(type,META.OPTION,{});
        option.aligned=align;
        SetMetaData<TypeOption>(type,META.OPTION,option);
        return true;
    }
    return false;
}
export const NullOrDef=<T>(...items:T[])=>items.find(x=>x!=null);

export const GetTypeFields=<T extends TypeBase>(type:T)=>GetMetaData<Fields>(type,META.FIELD);
export const SetTypeFields=<T extends TypeBase>(type:T,fields:Fields)=>SetMetaData<Fields>(type,META.FIELD,fields);
export const IsTypeInited=<T extends TypeBase>(type:T)=>GetMetaData<boolean>(type,META.INITED,false);
export const SetTypeInited=<T extends TypeBase>(type:T,inited:boolean)=>SetMetaData<boolean>(type,META.INITED,inited);