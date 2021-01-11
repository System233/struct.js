"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeBase = void 0;
const consts_1 = require("./consts");
const meta_1 = require("./meta");
const types_1 = require("./types");
const utils_1 = require("./utils");
class TypeBase {
    // private static __typeguard;
    constructor(view, base) {
        if (view == null) {
            view = new ArrayBuffer(utils_1.SizeOf(this));
        }
        if (!(view instanceof DataView)) {
            if (ArrayBuffer.isView(view)) {
                view = new DataView(view.buffer, view.byteOffset, view.byteLength);
            }
            else {
                view = new DataView(view, 0, view.byteLength);
            }
        }
        meta_1.SetMetaData(this, consts_1.META.VIEW, view);
        meta_1.SetMetaData(this, consts_1.META.BASE, base || 0);
    }
    get buffer() {
        return utils_1.GetBuffer(this);
    }
    static create(...args) {
        return types_1.CreateStruct(this, ...args);
    }
    static dump() {
        return utils_1.Dump(this);
    }
}
exports.TypeBase = TypeBase;
//# sourceMappingURL=common.js.map