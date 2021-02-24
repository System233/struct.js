"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefineFields = exports.CreateStruct = exports.StructHandler = exports.InitStruct = exports.AddField = void 0;
const arrays_1 = require("./arrays");
const common_1 = require("./common");
const consts_1 = require("./consts");
const meta_1 = require("./meta");
const string_1 = require("./string");
const utils_1 = require("./utils");
const AddField = (target, field) => {
    let { type, name, offset, size, shape, native, encoding, endian, aligned } = field;
    const len = shape == null ? 1 : shape.reduce((x, y) => x * y);
    const base = utils_1.SizeOf(target, true);
    const option = meta_1.GetMetaData(target, consts_1.META.OPTION, {});
    const align_type = utils_1.GetDefaultAlign(type);
    const align_target = utils_1.NullOrDef(option.aligned, Math.max(meta_1.GetMetaData(target, consts_1.META.ALIGN, 1), align_type));
    size = utils_1.NullOrDef(size, utils_1.SizeOf(type) * len);
    encoding = utils_1.NullOrDef(encoding, option.encoding);
    endian = utils_1.NullOrDef(endian, option.endian);
    offset = utils_1.NullOrDef(offset, base);
    if (!option.packed)
        offset = utils_1.Aligns(offset, align_type);
    const fields = meta_1.GetMetaData(target, consts_1.META.FIELD, new Map());
    fields.set(name, {
        type,
        name,
        offset,
        size,
        shape,
        native,
        endian,
        encoding,
        aligned
    });
    const real = Math.max(base, offset + size);
    meta_1.SetMetaData(target, consts_1.META.SIZE, utils_1.Aligns(real, align_target));
    meta_1.SetMetaData(target, consts_1.META.REAL_SIZE, real);
    meta_1.SetMetaData(target, consts_1.META.ALIGN, align_target);
    meta_1.SetMetaData(target, consts_1.META.FIELD, fields);
};
exports.AddField = AddField;
const InitStruct = (type) => {
    if (!utils_1.IsTypeInited(type)) {
        const fields = utils_1.GetTypeFields(type);
        fields.forEach(field => exports.AddField(type, field));
        utils_1.SetTypeInited(type, true);
    }
};
exports.InitStruct = InitStruct;
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
                const offset = fieldBase + index * utils_1.SizeOf(type);
                if (utils_1.IsNativeField(field)) {
                    return utils_1.NativeTypeDef[field.type].get(view, offset, field.endian);
                }
                else if (utils_1.IsStringField(field)) { //shape==null
                    return string_1.ReadAsString(view.buffer, view.byteOffset + fieldBase, utils_1.SizeOf(type), field.encoding);
                }
                else if (utils_1.IsCustomType(type)) {
                    return new type(view, offset);
                }
                return null;
            }
            else if (!shape.length) {
                if (utils_1.IsNativeField(field)) {
                    if (!native) {
                        const typed = arrays_1.ProxyTypeClassMap[field.type];
                        const offset = fieldBase + index * typed.BYTES_PER_ELEMENT;
                        return new typed(view, offset, current, field.endian);
                    }
                    else {
                        const typed = consts_1.NativeTypeClassMap[field.type];
                        const offset = fieldBase + index * typed.BYTES_PER_ELEMENT;
                        return new typed(view.buffer, offset, current);
                    }
                }
                else if (utils_1.IsStringField(field)) { //shape=[1]
                    const offset = fieldBase + index;
                    return string_1.ReadAsString(view.buffer, offset, current, field.encoding);
                }
            }
            else if (shape.length == 1 && utils_1.IsStringField(field)) {
                const offset = fieldBase + index;
                return new arrays_1.StringArray(view.buffer, offset, shape[0], current, field.encoding);
            }
            return Object.freeze([...Array(current)].map((_, i) => reads(base / current, index + base / current * i, ...shape)));
        };
        return reads(size, 0, ...shape || []);
    }
    write(target, field, value) {
        const { offset, name } = field;
        const view = meta_1.GetMetaData(target, consts_1.META.VIEW);
        const targetBase = meta_1.GetMetaData(target, consts_1.META.BASE);
        const fieldBase = view.byteOffset + targetBase + offset;
        if (utils_1.IsNativeField(field)) {
            utils_1.NativeTypeDef[field.type].set(view, fieldBase, value, field.encoding);
            return true;
        }
        else if (utils_1.IsStringField(field)) {
            if (field.shape.length > 1) {
                const array = this.get(target, name, null);
                utils_1.DeepAssign(array, value);
            }
            else if (field.shape.length) {
                string_1.WriteAsString(view.buffer, fieldBase, field.shape[0], field.encoding, value);
            }
            else {
                string_1.WriteAsString(view.buffer, fieldBase, 1, field.encoding, value);
            }
            return true;
        }
        else if (utils_1.IsCustomField(field)) {
            const obj = this.get(target, name, null);
            Object.assign(obj, value);
            return true;
        }
        return false;
    }
    has(target, p) {
        const fields = meta_1.GetMetaData(target, consts_1.META.FIELD);
        if (fields && fields.has(p)) {
            return true;
        }
        return p in target;
    }
    get(target, p, receiver) {
        const fields = meta_1.GetMetaData(target, consts_1.META.FIELD);
        if (fields.has(p)) {
            let cache = target[p];
            if (cache == null) {
                cache = this.read(target, fields.get(p));
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
        if (fields.has(p)) {
            const cache = target[p];
            if (cache == null) {
                return this.write(target, fields.get(p), value);
            }
            return utils_1.DeepAssign(cache, value);
            // return Object.assign(cache,value);
        }
        target[p] = value;
        return true;
    }
    ;
    static create(target, ...args) {
        if (!(target instanceof common_1.TypeBase)) {
            exports.InitStruct(target);
            target = new target(...args);
        }
        return new Proxy(target, new StructHandler);
    }
}
exports.StructHandler = StructHandler;
const CreateStruct = (target, ...args) => {
    return StructHandler.create(target, ...args);
};
exports.CreateStruct = CreateStruct;
const DefineFields = (type, ...fields) => {
    fields.flat().forEach(field => exports.AddField(type, field));
    return type;
};
exports.DefineFields = DefineFields;
//# sourceMappingURL=types.js.map