// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ProxyTypeClassMap } from "./arrays";
import { TypeBase } from "./common";
import { META, NativeTypeClassMap, NativeTypeMap, NativeTypes, NativeTypeSize } from "./consts";
import { FieldDef, Fields} from "./field";
import { GetMetaData, SetMetaData } from "./meta";
import { GetNativeTypeDef, NativeTypeDef } from "./utils";


export const SizeOf=(type:typeof TypeBase|TypeBase|NativeTypes):number=>{
    if(typeof type=="function"){
        return SizeOf(type.prototype);
    }
    if(typeof type=="object"){
        return GetMetaData<number>(type,META.SIZE)||0;
    }
    if(typeof type=="string"){
        return NativeTypeSize[type as NativeTypes];
    }
    return undefined;
}


export const AddField=<T extends TypeBase>(target:T,field:FieldDef)=>{
    const {type,name,offset,shape,native}=field;
    const len=shape==null?1:shape.reduce((x,y)=>x*y);
    const size=SizeOf(type)*len;
    const base=SizeOf(target);
    const fieldOffset=offset||base;
    const fields= GetMetaData<Fields>(target,META.FIELD)||{};
    fields[name as any]={
        type,
        name,
        offset:fieldOffset,
        size,
        shape,
        native
    };
    SetMetaData<number>(target,META.SIZE,Math.max(base,fieldOffset+size));
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
                if(typeof type=="string"){
                    return NativeTypeDef[type].get(view,offset);
                }else if(typeof type=="function"){
                    return new type(view,offset);
                }
                return null;
            }else if(!shape.length&&typeof type=="string"){
                if(!native){
                    const typed=ProxyTypeClassMap[type];
                    const offset=fieldBase+index*typed.BYTES_PER_ELEMENT;
                    return new typed(view,offset,current);
                }else{
                    const typed=NativeTypeClassMap[type];
                    const offset=fieldBase+index*typed.BYTES_PER_ELEMENT;
                    return new typed(view.buffer,offset,current);
                }
                
            }
            return Object.freeze([...Array(current)].map((_,i)=>reads(base/current,index+base/current*i,...shape)));
        }
        return reads(size,0,...shape||[]);
    }
    write(target:T,field:FieldDef,value:any):boolean{
        const {type,offset,name}=field;
        const view=GetMetaData<DataView>(target,META.VIEW);
        const targetBase=GetMetaData<number>(target,META.BASE);
        const fieldBase=targetBase+offset;
        if(typeof type=="string"){
            NativeTypeDef[type].set(view,fieldBase,value);
            return true;
        }else if(typeof type=="function"){
            const cache=this.get(target,name,null);
            Object.assign(cache,value);
            return true;
        }
        return false;
    }
    get(target: T, p: PropertyKey, receiver: any): any{
        const fields=GetMetaData<any>(target,META.FIELD);
        if(p in fields){
            let cache=target[p];
            if(cache==null){
                cache=this.read(target,fields[p]);
                if(typeof cache=="object")
                    target[p]=cache;
            }
            return cache;
        }
        return target[p];
    };
    set(target: T, p: PropertyKey, value: any, receiver: any): boolean{
        const fields=GetMetaData<any>(target,META.FIELD);
        if(p in fields){
            let cache=target[p];
            if(cache==null){
                return this.write(target,fields[p],value);
            }
            return Object.assign(cache,value);
        }
        target[p]=value;
        return true;
    };
}
export function InitStruct(target:TypeBase) {
    return new Proxy(target,new StructHandler());
}
