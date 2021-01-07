"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeTypeDef = exports.GetNativeTypeDef = void 0;
const consts_1 = require("./consts");
function GetNativeTypeDef(type) {
    const name = consts_1.NativeTypeNameMap[type];
    const getter = `get${name}`;
    const setter = `set${name}`;
    return {
        get(view, offset) {
            return view[getter](offset);
        },
        set(view, offset, value) {
            view[setter](offset, consts_1.NativeTypeConventMap[type](value));
        },
    };
}
exports.GetNativeTypeDef = GetNativeTypeDef;
exports.NativeTypeDef = {
    int8: GetNativeTypeDef('int8'),
    uint8: GetNativeTypeDef('uint8'),
    int16: GetNativeTypeDef('int16'),
    uint16: GetNativeTypeDef('uint16'),
    int32: GetNativeTypeDef('int32'),
    uint32: GetNativeTypeDef('uint32'),
    int64: GetNativeTypeDef('int64'),
    uint64: GetNativeTypeDef('uint64'),
    float32: GetNativeTypeDef('float32'),
    float64: GetNativeTypeDef('float64'),
};
