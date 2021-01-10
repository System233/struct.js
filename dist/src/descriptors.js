"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = exports.LittleEndian = exports.BigEndian = exports.Length = exports.Shape = exports.Size = exports.Native = exports.Offset = exports.Endian = exports.Encoding = exports.Aligned = exports.SetOption = exports.Field = void 0;
const types_1 = require("./types");
const utils_1 = require("./utils");
exports.Field = (type, option) => {
    return (target, propertyKey) => utils_1.SetFieldDef(target, propertyKey, {
        name: propertyKey,
        type,
        ...option || {}
    });
};
exports.SetOption = (option) => {
    return ((target, propertyKey) => {
        if (propertyKey != null) {
            utils_1.SetFieldDef(target, propertyKey, option);
        }
        else {
            utils_1.SetTypeDef(target, option);
        }
    });
};
exports.Aligned = (aligned) => exports.SetOption({ aligned });
exports.Encoding = (encoding) => exports.SetOption({ encoding });
exports.Endian = (endian) => exports.SetOption({ endian });
exports.Offset = (offset) => exports.SetOption({ offset });
exports.Native = (native) => exports.SetOption({ native });
exports.Size = (size) => exports.SetOption({ size });
exports.Shape = (...shape) => exports.SetOption({ shape });
exports.Length = exports.Shape;
exports.BigEndian = (target, propertyKey) => utils_1.SetFieldDef(target, propertyKey, { encoding: 'BE' });
exports.LittleEndian = (target, propertyKey) => utils_1.SetFieldDef(target, propertyKey, { encoding: 'LE' });
exports.Struct = (constructor, type) => {
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
//# sourceMappingURL=descriptors.js.map