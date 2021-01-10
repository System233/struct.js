// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ProxyTypeClassMap, StringArray } from "./arrays";
import { TypeBase } from "./common";
import { META, NativeTypeClassMap, NativeTypes, NativeTypeSize } from "./consts";
import { FieldDef, FieldOption, Fields, FieldStringDef, FieldTypeDef} from "./field";
import { GetMetaData, SetMetaData } from "./meta";
import { ReadAsString, WriteAsString } from "./string";
import { DeepAssign, IsCustomField, IsCustomType, IsNativeField, IsNativeType, IsStringField, NativeTypeDef, SizeOf } from "./utils";



export const AddField=<T extends TypeBase>(target:T,field:FieldOption)=>{
    let {type,name,offset,size,shape,native,encoding}=field;
    const len=shape==null?1:shape.reduce((x,y)=>x*y);
    const base=SizeOf(target);
    size=size||SizeOf(type)*len;
    offset=offset||base;
    const fields= GetMetaData<Fields>(target,META.FIELD)||{};
    fields[name as any]={
        type,
        name,
        offset,
        size,
        shape,
        native,
        encoding
    };
    SetMetaData<number>(target,META.SIZE,Math.max(base,offset+size));
    SetMetaData<Fields>(target,META.FIELD,fields);
}


export class StructHandler<T extends TypeBase> implements ProxyHandler<T>{
    //2,3,4
    //[0][0]->0
    //[0][0][1]->1
    //[0][1][0]->4
    //[0][1][1]->5
    //[0][2]->8
    //[1][0]->12
    //24,12,4

    read(target:T,field:FieldDef):any{
        const {type,shape,size,offset,native}=field;
        const view=GetMetaData<DataView>(target,META.VIEW);
        const targetBase=GetMetaData<number>(target,META.BASE);
        const fieldBase=targetBase+offset;
        const reads=(base:number,index:number,current?:number,...shape:number[])=>{
            if(current==null){
                const offset=fieldBase+index*SizeOf(type);
                if(IsNativeField(field)){
                    return NativeTypeDef[field.type].get(view,offset,field.encoding);
                }else if(IsStringField(field)){//shape==null
                    return ReadAsString(view.buffer,view.byteOffset+fieldBase,SizeOf(type),field.encoding);
                }else if(IsCustomType(type)){
                    return new type(view,offset);
                }
                return null;
            }else if(!shape.length){
                if(IsNativeField(field)){
                    if(!native){
                        const typed=ProxyTypeClassMap[field.type];
                        const offset=fieldBase+index*typed.BYTES_PER_ELEMENT;
                        return new typed(view,offset,current,field.encoding);
                    }else{
                        const typed=NativeTypeClassMap[field.type];
                        const offset=fieldBase+index*typed.BYTES_PER_ELEMENT;
                        return new typed(view.buffer,offset,current);
                    }
                }else if(IsStringField(field)){//shape=[1]
                    const offset=fieldBase+index;
                    return ReadAsString(view.buffer,offset,current,field.encoding);
                }
                
            }else if(shape.length==1&&IsStringField(field)){
                const offset=fieldBase+index;
                return new StringArray(view.buffer,offset,shape[0],current,field.encoding);
            }
            return Object.freeze([...Array(current)].map((_,i)=>reads(base/current,index+base/current*i,...shape)));
        }
        return reads(size,0,...shape||[]);
    }
    write(target:T,field:FieldDef,value:any):boolean{
        const {type,offset,name}=field;
        const view=GetMetaData<DataView>(target,META.VIEW);
        const targetBase=GetMetaData<number>(target,META.BASE);
        const fieldBase=view.byteOffset+targetBase+offset;
        
        if(IsNativeField(field)){
            NativeTypeDef[field.type].set(view,fieldBase,value,field.encoding);
            return true;
        }
        else if(IsStringField(field)){
            if(field.shape.length>1){
                const array=this.get(target,name,null);
                DeepAssign(array,value);
            }
            else if(field.shape.length){
                WriteAsString(view.buffer,view.byteOffset+offset,field.shape[0],field.encoding,value);
            }else{
                WriteAsString(view.buffer,view.byteOffset+offset,1,field.encoding,value);
            }
            return true;
        }
        else if(IsCustomField(field)){
            const obj=this.get(target,name,null);
            Object.assign(obj,value);
            return true;
        }
        return false;
    }
    get(target: T, p: PropertyKey, receiver: any): any{
        const fields=GetMetaData<Fields>(target,META.FIELD);
        if(p in fields){
            let cache=target[p];
            if(cache==null){
                cache=this.read(target,fields[p as any]);
                if(typeof cache=="object")
                    target[p]=cache;
            }
            return cache;
        }
        return target[p];
    };
    set(target: T, p: PropertyKey, value: any, receiver: any): boolean{
        const fields=GetMetaData<Fields>(target,META.FIELD);
        if(p in fields){
            const cache=target[p];
            if(cache==null){
                return this.write(target,fields[p as any],value);
            }
            return DeepAssign(cache,value);
            // return Object.assign(cache,value);
        }
        target[p]=value;
        return true;
    };
    static create<T extends typeof TypeBase>(type:T,...args:ConstructorParameters<T>):InstanceType<T>;
    static create<T extends TypeBase>(target:T):T;
    static create(target:TypeBase|typeof TypeBase,...args:any[]){
        if(!(target instanceof TypeBase))
            target=new target(...args);
        return new Proxy(target,new StructHandler);
    }
}

export const CreateStruct:{
    <T extends TypeBase>(target:T):T,
    <T extends typeof TypeBase>(type:T,...args:ConstructorParameters<T>):InstanceType<T>,
}=(target:any,...args:any[])=>{
    return StructHandler.create(target,...args);
}