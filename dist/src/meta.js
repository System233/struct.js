"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetMetaData = exports.GetMetaData = void 0;
const GetMetaTarget = (target) => typeof target == "function" ? target.prototype : target;
const GetMetaData = (target, meta, def) => {
    target = GetMetaTarget(target);
    if (Reflect.has(target, meta)) {
        return Reflect.get(target, meta);
    }
    return def;
};
exports.GetMetaData = GetMetaData;
const SetMetaData = (target, meta, value) => Reflect.set(GetMetaTarget(target), meta, value);
exports.SetMetaData = SetMetaData;
//# sourceMappingURL=meta.js.map