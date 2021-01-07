// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { SetMetaData, META } from "./meta";
import { SizeOf } from "./types";


export class TypeBase{
    constructor(view?:DataView|ArrayBufferLike,base?:number){
        if(view==null){
            view=new ArrayBuffer(SizeOf(this));
        }
        if(!ArrayBuffer.isView(view)){
            view=new DataView(view,0,SizeOf(this));
        }
        
        SetMetaData(this,META.VIEW,view);
        SetMetaData(this,META.BASE,view.byteOffset+(base||0));
    }
}
