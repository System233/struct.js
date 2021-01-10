// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ArrayProxy } from "./arrays";
import { TypeBase } from "./common";
import { DefaultEndian, Endianness, META, NativeTypeConventMap, NativeTypeMap, NativeTypes, NativeTypeSize } from "./consts";
import { FieldDef, FieldNativeDef, FieldOption, FieldStringDef, FieldTypeDef } from "./field";
import { GetMetaData } from "./meta";
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

export const IsNativeType=(type:any):type is NativeTypes=>{
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
export const IsStringType=(type:any):type is "string"=>{
    return type=="string";
}
export const IsStringField=(field:FieldDef|FieldOption):field is FieldStringDef=>{
    return IsStringType(field.type);
}


export const SizeOf=(type:typeof TypeBase|TypeBase|NativeTypes):number=>{
    if(IsCustomType(type)){
        return SizeOf(type.prototype);
    }
    if(IsNativeType(type)){
        return NativeTypeSize[type];
    }
    if(IsStringType(type)){
        return 1;
    }
    if(type instanceof TypeBase){
        return GetMetaData<number>(type,META.SIZE)||0;
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
        return `${pad}${type}\t${name as any}${dumpShape(shape)};\t//${dumpInfo()}\n`
    }
    else if(IsCustomField(field)){
        const {type,name,shape}=field;
        return `${pad}${type.name}\t${name as any}${dumpShape(shape)};\t//${dumpInfo()}\n`
    }
    return null;
}
export const DumpStruct=<T extends typeof TypeBase|TypeBase>(type:T):string=>{
    if(typeof type=="function")
        type=type.prototype;
    const fields=GetMetaData(type,META.FIELD);
    const size=SizeOf(type);
    return `class ${type.constructor.name}{\t//${size}\n${Object.values(fields).map(field=>DumpField(field,1)).join('')}}`;
}
export const Dump=<T extends typeof TypeBase|TypeBase|FieldDef>(type:T):string=>{
    if(typeof type=="function"&&type.prototype instanceof TypeBase||type instanceof TypeBase){
        return DumpStruct(type);
    }
    return DumpField(type as any,0);
}