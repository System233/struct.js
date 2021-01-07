// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { META } from "./consts";
export { META } from "./consts";
export const GetMetaData=<T>(target:object,meta:META):T=>Reflect.get(target,meta);
export const SetMetaData=<T>(target:object,meta:META,value:T)=>Reflect.set(target,meta,value);
