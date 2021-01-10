"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEncoding = exports.DefaultEndian = exports.NativeTypeSize = exports.NativeTypeConventMap = exports.NativeTypeClassMap = exports.META = void 0;
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
    NativeTypeSize[NativeTypeSize["int8"] = Int8Array.BYTES_PER_ELEMENT] = "int8";
    NativeTypeSize[NativeTypeSize["uint8"] = Uint8Array.BYTES_PER_ELEMENT] = "uint8";
    NativeTypeSize[NativeTypeSize["int16"] = Int16Array.BYTES_PER_ELEMENT] = "int16";
    NativeTypeSize[NativeTypeSize["uint16"] = Uint16Array.BYTES_PER_ELEMENT] = "uint16";
    NativeTypeSize[NativeTypeSize["int32"] = Int32Array.BYTES_PER_ELEMENT] = "int32";
    NativeTypeSize[NativeTypeSize["uint32"] = Uint32Array.BYTES_PER_ELEMENT] = "uint32";
    NativeTypeSize[NativeTypeSize["int64"] = BigInt64Array.BYTES_PER_ELEMENT] = "int64";
    NativeTypeSize[NativeTypeSize["uint64"] = BigUint64Array.BYTES_PER_ELEMENT] = "uint64";
    NativeTypeSize[NativeTypeSize["float32"] = Float32Array.BYTES_PER_ELEMENT] = "float32";
    NativeTypeSize[NativeTypeSize["float64"] = Float64Array.BYTES_PER_ELEMENT] = "float64";
})(NativeTypeSize = exports.NativeTypeSize || (exports.NativeTypeSize = {}));
exports.DefaultEndian = (() => {
    const testBuf = new ArrayBuffer(2);
    const u8array = new Uint8Array(testBuf);
    const u16array = new Uint16Array(testBuf);
    u16array[0] = 0x0102;
    return (u8array[0] > u8array[1]) ? "LE" : "BE";
})();
exports.DefaultEncoding = "utf-8";
//# sourceMappingURL=consts.js.map