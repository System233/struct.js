"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dump = exports.DumpStruct = exports.DumpField = exports.DeepAssign = exports.SizeOf = exports.IsStringField = exports.IsStringType = exports.IsCustomField = exports.IsCustomType = exports.IsNativeField = exports.IsNativeType = exports.NativeTypeDef = exports.GetNativeTypeDef = void 0;
const common_1 = require("./common");
const consts_1 = require("./consts");
const meta_1 = require("./meta");
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
})(NativeTypeNameMap || (NativeTypeNameMap = {}));
function GetNativeTypeDef(type) {
    const name = NativeTypeNameMap[type];
    const getter = `get${name}`;
    const setter = `set${name}`;
    return {
        get(view, offset, endian) {
            if (endian == null)
                endian = consts_1.DefaultEndian;
            return view[getter](offset, endian == "LE");
        },
        set(view, offset, value, endian) {
            if (endian == null)
                endian = consts_1.DefaultEndian;
            view[setter](offset, consts_1.NativeTypeConventMap[type](value), endian == "LE");
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
exports.IsNativeType = (type) => {
    return type in NativeTypeNameMap;
};
exports.IsNativeField = (field) => {
    return exports.IsNativeType(field.type);
};
exports.IsCustomType = (type) => {
    return typeof type == "function" && type.prototype instanceof common_1.TypeBase;
};
exports.IsCustomField = (field) => {
    return exports.IsCustomType(field.type);
};
exports.IsStringType = (type) => {
    return type == "string";
};
exports.IsStringField = (field) => {
    return exports.IsStringType(field.type);
};
exports.SizeOf = (type) => {
    if (exports.IsCustomType(type)) {
        return exports.SizeOf(type.prototype);
    }
    if (exports.IsNativeType(type)) {
        return consts_1.NativeTypeSize[type];
    }
    if (exports.IsStringType(type)) {
        return 1;
    }
    if (type instanceof common_1.TypeBase) {
        return meta_1.GetMetaData(type, consts_1.META.SIZE) || 0;
    }
    return undefined;
};
exports.DeepAssign = (target, ...args) => {
    args.filter(x => x != null).forEach(form => {
        Object.entries(form).forEach(([key, val]) => {
            if (key in target) {
                const current = target[key];
                if (typeof current == "object" && typeof val == "object") {
                    exports.DeepAssign(current, val);
                }
                else if (Object.getOwnPropertyDescriptor(target, key).writable) {
                    target[key] = val;
                }
            }
            else {
                target[key] = val;
            }
        });
    });
    return target;
};
exports.DumpField = (field, deep) => {
    deep = deep || 0;
    const dumpShape = (shape) => shape ? shape.map(x => `[${x}]`).join('') : '';
    const dumpInfo = () => {
        const array = [`+0x${field.offset.toString(16).toUpperCase()}`, `${field.size}`];
        if (field.encoding != null)
            array.push(`${field.encoding}`);
        if (field.native != null)
            array.push(`native`);
        return array.join(', ');
    };
    const pad = Array(deep + 1).join('\t');
    if (exports.IsNativeField(field) || exports.IsStringField(field)) {
        const { type, name, shape } = field;
        return `${pad}${type}\t${name}${dumpShape(shape)};\t//${dumpInfo()}\n`;
    }
    else if (exports.IsCustomField(field)) {
        const { type, name, shape } = field;
        return `${pad}${type.name}\t${name}${dumpShape(shape)};\t//${dumpInfo()}\n`;
    }
    return null;
};
exports.DumpStruct = (type) => {
    if (typeof type == "function")
        type = type.prototype;
    const fields = meta_1.GetMetaData(type, consts_1.META.FIELD);
    const size = exports.SizeOf(type);
    return `class ${type.constructor.name}{\t//${size}\n${Object.values(fields).map(field => exports.DumpField(field, 1)).join('')}}`;
};
exports.Dump = (type) => {
    if (typeof type == "function" && type.prototype instanceof common_1.TypeBase || type instanceof common_1.TypeBase) {
        return exports.DumpStruct(type);
    }
    return exports.DumpField(type, 0);
};
//# sourceMappingURL=utils.js.map