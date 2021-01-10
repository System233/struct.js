// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Fields } from "./field";
import { SetMetaData, META, GetMetaData } from "./meta";
import { IsNativeField, SizeOf } from "./utils";


export class TypeBase{
    private static __typeguard;
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
    static dump(ident?:number,deep?:number){
        const fields=GetMetaData<Fields>(this,META.FIELD);
        ident=ident||2;
        deep=deep+ident;
        
    return `class ${this.name}{${Object.values(fields).map((field)=>{
        if(IsNativeField(field)){
            const {type,name,offset,encoding,native,shape}=field;
            return `${type} ${name as any}${shape!=null?shape.map(d=>`[${d}]`).join(''):''};//offset=${field.offset},endian=${field.encoding},size=${field.size}`
        }
    })}\n}`;

    }
}
