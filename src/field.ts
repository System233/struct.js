// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { type } from "os";
import { TypeBase } from "./common";
import { Endianness, NativeType, StringType } from "./consts";

export interface FieldDef{
    type:NativeType|typeof TypeBase|StringType,
    name:PropertyKey,
    offset:number;
    aligned:number;
    size:number;
    native:boolean;
    shape:number[];
    encoding:string;
    endian:Endianness;
}


export interface FieldNativeDef extends Partial<FieldDef>{
    type?:NativeType,
    endian?:Endianness;
    encoding?:never;
}

export interface FieldTypeDef extends Partial<FieldDef>{
    type?:typeof TypeBase,
    endian?:never;
    encoding?:never;
}

export interface FieldStringDef extends Partial<FieldDef>{
    type?:"string",
    encoding?:string;
    endian?:never;
    native?:never;
}

export type FieldOption=FieldTypeDef|FieldNativeDef|FieldStringDef;

export type FiledType=NativeType|typeof TypeBase|StringType;
export type Fields=Map<PropertyKey,FieldDef>

