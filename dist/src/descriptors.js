"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = exports.LittleEndian = exports.BigEndian = exports.Length = exports.Shape = exports.Size = exports.Offset = exports.Endian = exports.Encoding = exports.Aligned = exports.Native = exports.Packed = exports.SetOption = exports.Field = void 0;
const types_1 = require("./types");
const utils_1 = require("./utils");
const Field = (type, option) => {
    return (target, propertyKey) => utils_1.SetFieldDef(target, propertyKey, {
        name: propertyKey,
        type,
        ...option || {}
    });
};
exports.Field = Field;
const SetOption = (option) => {
    return ((target, propertyKey) => {
        if (utils_1.IsCustomTypeInstance(target)) {
            utils_1.SetFieldDef(target, propertyKey, option);
        }
        else if (utils_1.IsCustomType(target)) {
            utils_1.SetTypeDef(target, option);
        }
    });
};
exports.SetOption = SetOption;
const SetOption2 = (target, propertyKey, name, def) => {
    if (utils_1.IsCustomType(target)) {
        utils_1.SetTypeDef(target, { [name]: def });
    }
    else if (utils_1.IsCustomTypeInstance(target)) {
        utils_1.SetFieldDef(target, propertyKey, { [name]: def });
    }
    else {
        return exports.SetOption({ [name]: target });
    }
};
const Packed = (target, propertyKey) => SetOption2(target, propertyKey, "packed", true);
exports.Packed = Packed;
const Native = (target, propertyKey) => SetOption2(target, propertyKey, "native", true);
exports.Native = Native;
const Aligned = (aligned) => exports.SetOption({ aligned });
exports.Aligned = Aligned;
const Encoding = (encoding) => exports.SetOption({ encoding });
exports.Encoding = Encoding;
const Endian = (endian) => exports.SetOption({ endian });
exports.Endian = Endian;
const Offset = (offset) => exports.SetOption({ offset });
exports.Offset = Offset;
// export const Native=(native:boolean)=>SetOption({native});
const Size = (size) => exports.SetOption({ size });
exports.Size = Size;
const Shape = (...shape) => exports.SetOption({ shape });
exports.Shape = Shape;
exports.Length = exports.Shape;
const BigEndian = (target, propertyKey) => utils_1.SetFieldDef(target, propertyKey, { encoding: 'BE' });
exports.BigEndian = BigEndian;
const LittleEndian = (target, propertyKey) => utils_1.SetFieldDef(target, propertyKey, { encoding: 'LE' });
exports.LittleEndian = LittleEndian;
const Struct = (constructor, type) => {
    if (utils_1.IsCustomType(constructor)) {
        return ((type) => {
            types_1.InitStruct(type);
            return type;
        })(class extends constructor {
            constructor(...args) {
                super(...args);
                return types_1.CreateStruct(this);
            }
        });
        // SetMetaData(anonymous,META.RAW_TYPE,constructor);
        // return anonymous;
    }
    else if (typeof constructor == "object") {
        return (target) => exports.Struct(target, type);
    }
};
exports.Struct = Struct;
//# sourceMappingURL=descriptors.js.map