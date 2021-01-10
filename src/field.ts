// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { type } from "os";
import { TypeBase } from "./common";
import { Endianness, NativeTypes as NativeType } from "./consts";

export interface FieldDef{
    type:NativeType|typeof TypeBase|"string",
    name:PropertyKey,
    offset:number;
    size:number;
    native?:boolean;
    shape?:number[];
    encoding?:Endianness|string;
}


export interface FieldNativeDef extends Partial<FieldDef>{
    type?:NativeType,
    encoding?:Endianness;
}

export interface FieldTypeDef extends Partial<FieldDef>{
    type?:typeof TypeBase,
    encoding?:never;
}

export interface FieldStringDef extends Partial<FieldDef>{
    type?:"string",
    encoding?:string;
}

export type FieldOption=FieldTypeDef|FieldNativeDef|FieldStringDef;
// export interface FieldDef{
//     name?:PropertyKey,
//     type?:typeof TypeBase|NativeTypes,
//     offset?:number;
//     size?:number;
//     native?:boolean;
//     encoding?:Endianness;
//     shape?:number[];
// }
export type FiledType=NativeType|typeof TypeBase|"string";
export type Fields={[key in PropertyKey]:FieldDef}

