"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyTypeClassMap = exports.StringArray = exports.Float64ArrayProxy = exports.Float32ArrayProxy = exports.BigUint64ArrayProxy = exports.BigInt64ArrayProxy = exports.Uint32ArrayProxy = exports.Int32ArrayProxy = exports.Uint16ArrayProxy = exports.Int16ArrayProxy = exports.Uint8ArrayProxy = exports.Int8ArrayProxy = exports.TypedArray = exports.ArrayProxy = void 0;
const consts_1 = require("./consts");
const string_1 = require("./string");
const utils_1 = require("./utils");
class ArrayProxy extends Array {
}
exports.ArrayProxy = ArrayProxy;
class TypedArray extends ArrayProxy {
    constructor(view, byteOffset, length, endian) {
        super(length);
        if (ArrayBuffer.isView(view)) {
            if (view instanceof DataView) {
                this.view = view;
            }
            else {
                this.view = new DataView(view.buffer, view.byteOffset, view.byteOffset);
            }
        }
        else {
            this.view = new DataView(view, 0, view.byteLength);
        }
        this.byteOffset = byteOffset || 0;
        this.endian = endian || consts_1.DefaultEndian;
        Object.freeze(this);
        return new Proxy(this, this);
    }
    static get BYTES_PER_ELEMENT() { return consts_1.NativeTypeSize[this.type]; }
    ;
    get type() { return (Object.getPrototypeOf(this).constructor).type; }
    get BYTES_PER_ELEMENT() { return (Object.getPrototypeOf(this).constructor).BYTES_PER_ELEMENT; }
    get buffer() { return this.view.buffer; }
    get byteLength() { return this.BYTES_PER_ELEMENT * this.length; }
    get(target, prop, receiver) {
        if (typeof prop == "string" && isFinite(+prop) || typeof prop == "number") {
            return utils_1.NativeTypeDef[this.type].get(this.view, this.byteOffset + (+prop) * this.BYTES_PER_ELEMENT, this.endian);
        }
        return target[prop];
    }
    set(target, prop, value, receiver) {
        if (typeof prop == "string" && isFinite(+prop) || typeof prop == "number") {
            utils_1.NativeTypeDef[this.type].set(this.view, this.byteOffset + (+prop) * this.BYTES_PER_ELEMENT, value, this.endian);
            return true;
        }
        target[prop] = value;
        return true;
    }
}
exports.TypedArray = TypedArray;
class Int8ArrayProxy extends TypedArray {
}
exports.Int8ArrayProxy = Int8ArrayProxy;
Int8ArrayProxy.type = "int8";
class Uint8ArrayProxy extends TypedArray {
}
exports.Uint8ArrayProxy = Uint8ArrayProxy;
Uint8ArrayProxy.type = "uint8";
class Int16ArrayProxy extends TypedArray {
}
exports.Int16ArrayProxy = Int16ArrayProxy;
Int16ArrayProxy.type = "int16";
class Uint16ArrayProxy extends TypedArray {
}
exports.Uint16ArrayProxy = Uint16ArrayProxy;
Uint16ArrayProxy.type = "uint16";
class Int32ArrayProxy extends TypedArray {
}
exports.Int32ArrayProxy = Int32ArrayProxy;
Int32ArrayProxy.type = "int32";
class Uint32ArrayProxy extends TypedArray {
}
exports.Uint32ArrayProxy = Uint32ArrayProxy;
Uint32ArrayProxy.type = "uint32";
class BigInt64ArrayProxy extends TypedArray {
}
exports.BigInt64ArrayProxy = BigInt64ArrayProxy;
BigInt64ArrayProxy.type = "int64";
class BigUint64ArrayProxy extends TypedArray {
}
exports.BigUint64ArrayProxy = BigUint64ArrayProxy;
BigUint64ArrayProxy.type = "uint64";
class Float32ArrayProxy extends TypedArray {
}
exports.Float32ArrayProxy = Float32ArrayProxy;
Float32ArrayProxy.type = "float32";
class Float64ArrayProxy extends TypedArray {
}
exports.Float64ArrayProxy = Float64ArrayProxy;
Float64ArrayProxy.type = "float64";
class StringArray extends ArrayProxy {
    constructor(buffer, byteOffset, byteLength, length, encoding) {
        super(length);
        this.buffer = buffer;
        this.byteOffset = byteOffset;
        this.byteLength = byteLength;
        this.encoding = encoding;
        Object.freeze(this);
        return new Proxy(this, this);
    }
    has(target, p) {
        return p in target;
    }
    get(target, prop) {
        if (typeof prop == "string" && isFinite(+prop) || typeof prop == "number") {
            return string_1.ReadAsString(this.buffer, this.byteOffset + (+prop) * this.byteLength, this.byteLength, this.encoding);
        }
        if (prop in target) {
            return target[prop];
        }
        return undefined;
    }
    set(target, prop, value) {
        if (typeof prop == "string" && isFinite(+prop) || typeof prop == "number") {
            string_1.WriteAsString(this.buffer, this.byteOffset + (+prop) * this.byteLength, this.byteLength, this.encoding, value);
            return true;
        }
        if (prop in target) {
            target[prop] = value;
            return true;
        }
        return false;
    }
}
exports.StringArray = StringArray;
exports.ProxyTypeClassMap = {
    int8: Int8ArrayProxy,
    uint8: Uint8ArrayProxy,
    int16: Int16ArrayProxy,
    uint16: Uint16ArrayProxy,
    int32: Int32ArrayProxy,
    uint32: Uint32ArrayProxy,
    int64: BigInt64ArrayProxy,
    uint64: BigUint64ArrayProxy,
    float32: Float32ArrayProxy,
    float64: Float64ArrayProxy,
};
//# sourceMappingURL=arrays.js.map