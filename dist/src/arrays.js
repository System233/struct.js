"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyTypeClassMap = exports.Float64ArrayProxy = exports.Float32ArrayProxy = exports.BigUint64ArrayProxy = exports.BigInt64ArrayProxy = exports.Uint32ArrayProxy = exports.Int32ArrayProxy = exports.Uint16ArrayProxy = exports.Int16ArrayProxy = exports.Uint8ArrayProxy = exports.Int8ArrayProxy = void 0;
const utils_1 = require("./utils");
// interface TypedArrayConstructor<T extends number|BigInt> extends ArrayConstructor{
//     readonly prototype:TypedArray<T>;
//     readonly BYTES_PER_ELEMENT: number;
//     new(buffer: ArrayBufferLike, byteOffset?: number, length?: number): TypedArray<T>;
// }
// declare var TypedArray: TypedArrayConstructor<number|BigInt>;
class TypedArrayImpl extends Array {
    constructor(view, byteOffset, length) {
        super(length);
        this.byteOffset = byteOffset;
        if (!ArrayBuffer.isView(view)) {
            view = new DataView(view, 0, length * this.BYTES_PER_ELEMENT);
        }
        this.view = view;
        Object.freeze(this);
        return new Proxy(this, this);
    }
    get BYTES_PER_ELEMENT() { return this.constructor.BYTES_PER_ELEMENT; }
    get type() { return this.constructor.type; }
    get buffer() { return this.view.buffer; }
    get byteLength() { return this.BYTES_PER_ELEMENT * this.length; }
    get(target, prop, receiver) {
        if (typeof prop == "string" && isFinite(+prop) || typeof prop == "number") {
            const index = +prop;
            if (index >= target.length)
                return null;
            return utils_1.NativeTypeDef[this.type].get(this.view, this.byteOffset + index * this.BYTES_PER_ELEMENT);
        }
        return target[prop];
    }
    set(target, prop, value, receiver) {
        if (typeof prop == "string" && isFinite(+prop) || typeof prop == "number") {
            const index = +prop;
            if (index >= target.length)
                return false;
            utils_1.NativeTypeDef[this.type].set(this.view, this.byteOffset + index * this.BYTES_PER_ELEMENT, value);
            return true;
        }
        return true;
    }
}
class Int8ArrayProxy extends TypedArrayImpl {
}
exports.Int8ArrayProxy = Int8ArrayProxy;
Int8ArrayProxy.BYTES_PER_ELEMENT = Int8Array.BYTES_PER_ELEMENT;
Int8ArrayProxy.type = "int8";
class Uint8ArrayProxy extends TypedArrayImpl {
}
exports.Uint8ArrayProxy = Uint8ArrayProxy;
Uint8ArrayProxy.BYTES_PER_ELEMENT = Uint8Array.BYTES_PER_ELEMENT;
Uint8ArrayProxy.type = "uint8";
class Int16ArrayProxy extends TypedArrayImpl {
}
exports.Int16ArrayProxy = Int16ArrayProxy;
Int16ArrayProxy.BYTES_PER_ELEMENT = Int16Array.BYTES_PER_ELEMENT;
Int16ArrayProxy.type = "int16";
class Uint16ArrayProxy extends TypedArrayImpl {
}
exports.Uint16ArrayProxy = Uint16ArrayProxy;
Uint16ArrayProxy.BYTES_PER_ELEMENT = Uint16Array.BYTES_PER_ELEMENT;
Uint16ArrayProxy.type = "uint16";
class Int32ArrayProxy extends TypedArrayImpl {
}
exports.Int32ArrayProxy = Int32ArrayProxy;
Int32ArrayProxy.BYTES_PER_ELEMENT = Int32Array.BYTES_PER_ELEMENT;
Int32ArrayProxy.type = "int32";
class Uint32ArrayProxy extends TypedArrayImpl {
}
exports.Uint32ArrayProxy = Uint32ArrayProxy;
Uint32ArrayProxy.BYTES_PER_ELEMENT = Uint32Array.BYTES_PER_ELEMENT;
Uint32ArrayProxy.type = "uint32";
class BigInt64ArrayProxy extends TypedArrayImpl {
}
exports.BigInt64ArrayProxy = BigInt64ArrayProxy;
BigInt64ArrayProxy.BYTES_PER_ELEMENT = BigInt64Array.BYTES_PER_ELEMENT;
BigInt64ArrayProxy.type = "int64";
class BigUint64ArrayProxy extends TypedArrayImpl {
}
exports.BigUint64ArrayProxy = BigUint64ArrayProxy;
BigUint64ArrayProxy.BYTES_PER_ELEMENT = BigUint64Array.BYTES_PER_ELEMENT;
BigUint64ArrayProxy.type = "uint64";
class Float32ArrayProxy extends TypedArrayImpl {
}
exports.Float32ArrayProxy = Float32ArrayProxy;
Float32ArrayProxy.BYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT;
Float32ArrayProxy.type = "float32";
class Float64ArrayProxy extends TypedArrayImpl {
}
exports.Float64ArrayProxy = Float64ArrayProxy;
Float64ArrayProxy.BYTES_PER_ELEMENT = Float64Array.BYTES_PER_ELEMENT;
Float64ArrayProxy.type = "float64";
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
