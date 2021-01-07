// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NativeTypeConventMap, NativeTypeMap, NativeTypeNameMap } from "./consts";

export function  GetNativeTypeDef<T extends keyof NativeTypeMap>(type:T){
    const name=NativeTypeNameMap[type];
    const getter=`get${name}`;
    const setter=`set${name}`;
    return {
        get(view:DataView,offset:number){
            return view[getter](offset);
        },
        set(view:DataView,offset:number,value:NativeTypeMap[T][0]){
            view[setter](offset,NativeTypeConventMap[type](value));
        },
    }
}
export const NativeTypeDef={
    int8:GetNativeTypeDef('int8'),
    uint8:GetNativeTypeDef('uint8'),
    int16:GetNativeTypeDef('int16'),
    uint16:GetNativeTypeDef('uint16'),
    int32:GetNativeTypeDef('int32'),
    uint32:GetNativeTypeDef('uint32'),
    int64:GetNativeTypeDef('int64'),
    uint64:GetNativeTypeDef('uint64'),
    float32:GetNativeTypeDef('float32'),
    float64:GetNativeTypeDef('float64'),
}