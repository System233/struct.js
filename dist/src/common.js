"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeBase = void 0;
const meta_1 = require("./meta");
const types_1 = require("./types");
class TypeBase {
    constructor(view, base) {
        if (view == null) {
            view = new ArrayBuffer(types_1.SizeOf(this));
        }
        if (!ArrayBuffer.isView(view)) {
            view = new DataView(view, 0, types_1.SizeOf(this));
        }
        meta_1.SetMetaData(this, meta_1.META.VIEW, view);
        meta_1.SetMetaData(this, meta_1.META.BASE, view.byteOffset + (base || 0));
    }
}
exports.TypeBase = TypeBase;
