// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { META } from "./consts";
const GetMetaTarget=(target:Object)=>typeof target=="function"?target.prototype:target;
export const GetMetaData=<T>(target:object,meta:META,def?:T):T=>{
    target=GetMetaTarget(target);
    if(Reflect.has(target,meta)){
        return Reflect.get(target,meta);
    }
    return def;
}
export const SetMetaData=<T>(target:object,meta:META,value:T)=>Reflect.set(GetMetaTarget(target),meta,value);
