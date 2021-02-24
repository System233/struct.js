"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBuffer = exports.SetTypeInited = exports.IsTypeInited = exports.SetTypeFields = exports.GetTypeFields = exports.NullOrDef = exports.SetDefaultAlign = exports.GetDefaultAlign = exports.SetFieldDef = exports.GetFieldDef = exports.SetTypeDef = exports.GetTypeDef = exports.Aligns = exports.Dump = exports.DumpType = exports.DumpField = exports.TypeToCpp = exports.DeepAssign = exports.SizeOf = exports.IsStringField = exports.IsStringType = exports.IsCustomField = exports.IsCustomTypeInstance = exports.IsCustomType = exports.IsNativeField = exports.IsNativeType = exports.NativeTypeDef = exports.GetNativeTypeDef = void 0;
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
const IsNativeType = (type) => {
    return type in NativeTypeNameMap;
};
exports.IsNativeType = IsNativeType;
const IsNativeField = (field) => {
    return exports.IsNativeType(field.type);
};
exports.IsNativeField = IsNativeField;
const IsCustomType = (type) => {
    return (typeof type == "function" && type.prototype instanceof common_1.TypeBase);
};
exports.IsCustomType = IsCustomType;
const IsCustomTypeInstance = (type) => {
    return (type instanceof common_1.TypeBase);
};
exports.IsCustomTypeInstance = IsCustomTypeInstance;
const IsCustomField = (field) => {
    return exports.IsCustomType(field.type);
};
exports.IsCustomField = IsCustomField;
const IsStringType = (type) => {
    return type == "string";
};
exports.IsStringType = IsStringType;
const IsStringField = (field) => {
    return exports.IsStringType(field.type);
};
exports.IsStringField = IsStringField;
const SizeOf = (type, real) => {
    if (exports.IsCustomType(type)) {
        return exports.SizeOf(type.prototype, real);
    }
    if (exports.IsNativeType(type)) {
        return consts_1.NativeTypeSize[type];
    }
    if (exports.IsStringType(type)) {
        return 1;
    }
    if (type instanceof common_1.TypeBase) {
        return meta_1.GetMetaData(type, real ? consts_1.META.REAL_SIZE : consts_1.META.SIZE, 0);
    }
    return undefined;
};
exports.SizeOf = SizeOf;
const DeepAssign = (target, ...args) => {
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
exports.DeepAssign = DeepAssign;
const TypeToCpp = (type) => {
    if (exports.IsCustomType(type))
        return type.name;
    if (exports.IsNativeType(type))
        return `${type}_t`;
    if (exports.IsStringType(type))
        return 'char';
    return null;
};
exports.TypeToCpp = TypeToCpp;
const DumpField = (field, deep) => {
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
        return `${pad}${exports.TypeToCpp(type)}\t${name}${dumpShape(shape)};\t//${dumpInfo()}\n`;
    }
    else if (exports.IsCustomField(field)) {
        const { type, name, shape } = field;
        return `${pad}${type.name}\t${name}${dumpShape(shape)};\t//${dumpInfo()}\n`;
    }
    return null;
};
exports.DumpField = DumpField;
const DumpType = (type) => {
    const fields = exports.GetTypeFields(type);
    const size = exports.SizeOf(type);
    const align = meta_1.GetMetaData(type, consts_1.META.ALIGN);
    return `struct ${type.name}{\t//${size}, align=${align}\n${Array.from(fields.values(), field => exports.DumpField(field, 1)).join('')}}__attribute__((aligned(${align})));`;
};
exports.DumpType = DumpType;
const Dump = (type) => {
    if (exports.IsCustomType(type)) {
        return exports.DumpType(type);
    }
    return exports.DumpField(type, 0);
};
exports.Dump = Dump;
//1,4->4
//2,4->4
//5,4->8
const Aligns = (addr, align) => (addr + align - 1) & (~(align - 1));
exports.Aligns = Aligns;
const GetTypeDef = (target) => meta_1.GetMetaData(target, consts_1.META.OPTION);
exports.GetTypeDef = GetTypeDef;
const SetTypeDef = (target, option) => {
    const value = meta_1.GetMetaData(target, consts_1.META.OPTION, {});
    Object.assign(value, option);
    meta_1.SetMetaData(target, consts_1.META.OPTION, value);
};
exports.SetTypeDef = SetTypeDef;
const GetFieldDef = (target, name) => {
    const fields = meta_1.GetMetaData(target, consts_1.META.FIELD);
    if (fields && fields.has(name))
        return fields.get(name);
    return null;
};
exports.GetFieldDef = GetFieldDef;
const SetFieldDef = (target, name, option) => {
    const fields = meta_1.GetMetaData(target, consts_1.META.FIELD, new Map);
    if (fields.has(name)) {
        Object.assign(fields.get(name), option);
    }
    else {
        fields.set(name, option);
        meta_1.SetMetaData(target, consts_1.META.FIELD, fields);
    }
};
exports.SetFieldDef = SetFieldDef;
const GetDefaultAlign = (type) => {
    if (exports.IsCustomType(type)) {
        const { aligned: align } = meta_1.GetMetaData(type, consts_1.META.OPTION, {});
        return exports.NullOrDef(align, 1);
    }
    else {
        return exports.SizeOf(type);
    }
};
exports.GetDefaultAlign = GetDefaultAlign;
const SetDefaultAlign = (type, align) => {
    if (exports.IsCustomType(type)) {
        const option = meta_1.GetMetaData(type, consts_1.META.OPTION, {});
        option.aligned = align;
        meta_1.SetMetaData(type, consts_1.META.OPTION, option);
        return true;
    }
    return false;
};
exports.SetDefaultAlign = SetDefaultAlign;
const NullOrDef = (...items) => items.find(x => x != null);
exports.NullOrDef = NullOrDef;
const GetTypeFields = (type) => meta_1.GetMetaData(type, consts_1.META.FIELD);
exports.GetTypeFields = GetTypeFields;
const SetTypeFields = (type, fields) => meta_1.SetMetaData(type, consts_1.META.FIELD, fields);
exports.SetTypeFields = SetTypeFields;
const IsTypeInited = (type) => meta_1.GetMetaData(type, consts_1.META.INITED, false);
exports.IsTypeInited = IsTypeInited;
const SetTypeInited = (type, inited) => meta_1.SetMetaData(type, consts_1.META.INITED, inited);
exports.SetTypeInited = SetTypeInited;
const GetBuffer = (target) => {
    const view = meta_1.GetMetaData(target, consts_1.META.VIEW);
    if (view != null) {
        const base = meta_1.GetMetaData(target, consts_1.META.BASE);
        return new Uint8Array(view.buffer, view.byteOffset + base, exports.SizeOf(target));
    }
    return null;
};
exports.GetBuffer = GetBuffer;
//# sourceMappingURL=utils.js.map