"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = exports.Field = void 0;
const types_1 = require("./types");
exports.Field = (type, option) => {
    return (target, propertyKey) => types_1.AddField(target, {
        name: propertyKey,
        type,
        ...option || {}
    });
};
exports.Struct = (constructor) => {
    return class extends constructor {
        constructor(...args) {
            super(...args);
            return types_1.CreateStruct(this);
        }
    };
};
//# sourceMappingURL=descriptors.js.map