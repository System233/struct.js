"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeBase = void 0;
const meta_1 = require("./meta");
const utils_1 = require("./utils");
class TypeBase {
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
        meta_1.SetMetaData(this, meta_1.META.VIEW, view);
        meta_1.SetMetaData(this, meta_1.META.BASE, base || 0);
    }
    static dump(ident, deep) {
        const fields = meta_1.GetMetaData(this, meta_1.META.FIELD);
        ident = ident || 2;
        deep = deep + ident;
        return `class ${this.name}{${Object.values(fields).map((field) => {
            if (utils_1.IsNativeField(field)) {
                const { type, name, offset, encoding, native, shape } = field;
                return `${type} ${name}${shape != null ? shape.map(d => `[${d}]`).join('') : ''};//offset=${field.offset},endian=${field.encoding},size=${field.size}`;
            }
        })}\n}`;
    }
}
exports.TypeBase = TypeBase;
//# sourceMappingURL=common.js.map