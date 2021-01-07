"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitStruct = exports.StructHandler = exports.AddField = exports.SizeOf = void 0;
const arrays_1 = require("./arrays");
const consts_1 = require("./consts");
const meta_1 = require("./meta");
const utils_1 = require("./utils");
exports.SizeOf = (type) => {
    if (typeof type == "function") {
        return exports.SizeOf(type.prototype);
    }
    if (typeof type == "object") {
        return meta_1.GetMetaData(type, consts_1.META.SIZE) || 0;
    }
    if (typeof type == "string") {
        return consts_1.NativeTypeSize[type];
    }
    return undefined;
};
exports.AddField = (target, field) => {
    const { type, name, offset, shape, native } = field;
    const len = shape == null ? 1 : shape.reduce((x, y) => x * y);
    const size = exports.SizeOf(type) * len;
    const base = exports.SizeOf(target);
    const fieldOffset = offset || base;
    const fields = meta_1.GetMetaData(target, consts_1.META.FIELD) || {};
    fields[name] = {
        type,
        name,
        offset: fieldOffset,
        size,
        shape,
        native
    };
    meta_1.SetMetaData(target, consts_1.META.SIZE, Math.max(base, fieldOffset + size));
    meta_1.SetMetaData(target, consts_1.META.FIELD, fields);
};
class StructHandler {
    //2,3,4
    //[0][0]->0
    //[0][0][1]->1
    //[0][1][0]->4
    //[0][1][1]->5
    //[0][2]->8
    //[1][0]->12
    //24,12,4
    read(target, field) {
        const { type, shape, size, offset, native } = field;
        const view = meta_1.GetMetaData(target, consts_1.META.VIEW);
        const targetBase = meta_1.GetMetaData(target, consts_1.META.BASE);
        const fieldBase = targetBase + offset;
        const reads = (base, index, current, ...shape) => {
            if (current == null) {
                const offset = fieldBase + index * exports.SizeOf(type);
                if (typeof type == "string") {
                    return utils_1.NativeTypeDef[type].get(view, offset);
                }
                else if (typeof type == "function") {
                    return new type(view, offset);
                }
                return null;
            }
            else if (!shape.length && typeof type == "string") {
                if (!native) {
                    const typed = arrays_1.ProxyTypeClassMap[type];
                    const offset = fieldBase + index * typed.BYTES_PER_ELEMENT;
                    return new typed(view, offset, current);
                }
                else {
                    const typed = consts_1.NativeTypeClassMap[type];
                    const offset = fieldBase + index * typed.BYTES_PER_ELEMENT;
                    return new typed(view.buffer, offset, current);
                }
            }
            return Object.freeze([...Array(current)].map((_, i) => reads(base / current, index + base / current * i, ...shape)));
        };
        return reads(size, 0, ...shape || []);
    }
    write(target, field, value) {
        const { type, offset, name } = field;
        const view = meta_1.GetMetaData(target, consts_1.META.VIEW);
        const targetBase = meta_1.GetMetaData(target, consts_1.META.BASE);
        const fieldBase = targetBase + offset;
        if (typeof type == "string") {
            utils_1.NativeTypeDef[type].set(view, fieldBase, value);
            return true;
        }
        else if (typeof type == "function") {
            const cache = this.get(target, name, null);
            Object.assign(cache, value);
            return true;
        }
        return false;
    }
    get(target, p, receiver) {
        const fields = meta_1.GetMetaData(target, consts_1.META.FIELD);
        if (p in fields) {
            let cache = target[p];
            if (cache == null) {
                cache = this.read(target, fields[p]);
                if (typeof cache == "object")
                    target[p] = cache;
            }
            return cache;
        }
        return target[p];
    }
    ;
    set(target, p, value, receiver) {
        const fields = meta_1.GetMetaData(target, consts_1.META.FIELD);
        if (p in fields) {
            let cache = target[p];
            if (cache == null) {
                return this.write(target, fields[p], value);
            }
            return Object.assign(cache, value);
        }
        target[p] = value;
        return true;
    }
    ;
}
exports.StructHandler = StructHandler;
function InitStruct(target) {
    return new Proxy(target, new StructHandler());
}
exports.InitStruct = InitStruct;
