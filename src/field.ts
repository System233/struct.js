// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TypeBase } from "./common";
import { NativeTypes } from "./consts";


export interface FieldDef{
    name?:PropertyKey,
    type?:typeof TypeBase|NativeTypes,
    offset?:number;
    size?:number;
    native?:boolean;
    shape?:number[];
}

export type Fields={[key in PropertyKey]:FieldDef}

