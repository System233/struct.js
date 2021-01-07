"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeTypeNameMap = exports.NativeTypeSize = exports.NativeTypeConventMap = exports.NativeTypeClassMap = exports.META = void 0;
var META;
(function (META) {
    META[META["VIEW"] = 0] = "VIEW";
    META[META["BASE"] = 1] = "BASE";
    META[META["FIELD"] = 2] = "FIELD";
    META[META["SIZE"] = 3] = "SIZE";
    META[META["ALIGN"] = 4] = "ALIGN";
})(META = exports.META || (exports.META = {}));
exports.NativeTypeClassMap = {
    int8: Int8Array,
    uint8: Uint8Array,
    int16: Int16Array,
    uint16: Uint16Array,
    int32: Int32Array,
    uint32: Uint32Array,
    int64: BigInt64Array,
    uint64: BigUint64Array,
    float32: Float32Array,
    float64: Float64Array,
};
exports.NativeTypeConventMap = {
    int8: Number,
    uint8: Number,
    int16: Number,
    uint16: Number,
    int32: Number,
    uint32: Number,
    int64: BigInt,
    uint64: BigInt,
    float32: Number,
    float64: Number,
};
// export type NativeTypeMap=typeof NativeTypeClassMap;
var NativeTypeSize;
(function (NativeTypeSize) {
    NativeTypeSize[NativeTypeSize["int8"] = 1] = "int8";
    NativeTypeSize[NativeTypeSize["uint8"] = 1] = "uint8";
    NativeTypeSize[NativeTypeSize["int16"] = 2] = "int16";
    NativeTypeSize[NativeTypeSize["uint16"] = 2] = "uint16";
    NativeTypeSize[NativeTypeSize["int32"] = 4] = "int32";
    NativeTypeSize[NativeTypeSize["uint32"] = 4] = "uint32";
    NativeTypeSize[NativeTypeSize["int64"] = 8] = "int64";
    NativeTypeSize[NativeTypeSize["uint64"] = 8] = "uint64";
    NativeTypeSize[NativeTypeSize["float32"] = 4] = "float32";
    NativeTypeSize[NativeTypeSize["float64"] = 8] = "float64";
})(NativeTypeSize = exports.NativeTypeSize || (exports.NativeTypeSize = {}));
var NativeTypeNameMap;
(function (NativeTypeNameMap) {
    NativeTypeNameMap["int8"] = "Int8";
    NativeTypeNameMap["uint8"] = "Uint8";
    NativeTypeNameMap["int16"] = "Int16";
    NativeTypeNameMap["uint16"] = "Uint16";
    NativeTypeNameMap["int32"] = "Int32";
    NativeTypeNameMap["uint32"] = "Uint32";
    NativeTypeNameMap["int64"] = "BigInt64";
    NativeTypeNameMap["uint64"] = "BigUint64";
    NativeTypeNameMap["float32"] = "Float32";
    NativeTypeNameMap["float64"] = "Float64";
})(NativeTypeNameMap = exports.NativeTypeNameMap || (exports.NativeTypeNameMap = {}));
