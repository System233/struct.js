// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TypeBase } from "./common";
import { NativeTypes } from "./consts";
import { FieldDef, FieldOption, FiledType } from "./field";
import { AddField,CreateStruct} from "./types";

export const Field= <T extends FiledType>(type:T,option?:Partial<FieldOption&{type:T}>):PropertyDecorator=>{
    return <T extends TypeBase>(target: T, propertyKey: string | symbol):void=>AddField(target,
        {
            name:propertyKey,
            type,
            ...option as any||{}
        });
}
export const Struct= <T extends typeof TypeBase>(constructor:T):T=>{
    return <T>class extends (constructor as any) {
        constructor(...args){
            super(...args);
            return CreateStruct(this as InstanceType<T>);
        }
    };
}