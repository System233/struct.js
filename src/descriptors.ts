// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TypeBase } from "./common";
import { NativeTypes } from "./consts";
import { FieldDef } from "./field";
import { AddField,InitStruct} from "./types";


export const Field= (type:NativeTypes|typeof TypeBase,option?:FieldDef):PropertyDecorator=>{
    return (target: Object, propertyKey: string | symbol):void=>AddField(target,
        {
            name:propertyKey,
            type,
            ...option||{}
        });
}
export const Struct= <T extends {new(...args:any[]):TypeBase}>(constructor:T)=>{
    return class extends constructor {
        constructor(...args){
            super(...args);
            return InitStruct(this);
        }
    };
}