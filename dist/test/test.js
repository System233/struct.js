"use strict";
// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
let SimpleStruct = class SimpleStruct extends src_1.TypeBase {
};
__decorate([
    src_1.Field("int8")
], SimpleStruct.prototype, "int8", void 0);
__decorate([
    src_1.Field("int16")
], SimpleStruct.prototype, "int16", void 0);
__decorate([
    src_1.Field("int32")
], SimpleStruct.prototype, "int32", void 0);
__decorate([
    src_1.Field("int64")
], SimpleStruct.prototype, "int64", void 0);
__decorate([
    src_1.Field("uint8")
], SimpleStruct.prototype, "uint8", void 0);
__decorate([
    src_1.Field("uint16")
], SimpleStruct.prototype, "uint16", void 0);
__decorate([
    src_1.Field("uint32")
], SimpleStruct.prototype, "uint32", void 0);
__decorate([
    src_1.Field("uint32", {
        shape: [10],
        encoding: 'LE'
    })
], SimpleStruct.prototype, "uint32x", void 0);
__decorate([
    src_1.Field("string", {
        shape: [10, 10],
    })
], SimpleStruct.prototype, "string", void 0);
__decorate([
    src_1.Field("uint64")
], SimpleStruct.prototype, "uint64", void 0);
SimpleStruct = __decorate([
    src_1.Struct
], SimpleStruct);
let ComplexStruct = class ComplexStruct extends src_1.TypeBase {
};
__decorate([
    src_1.Field(SimpleStruct)
], ComplexStruct.prototype, "s1", void 0);
__decorate([
    src_1.Field(SimpleStruct)
], ComplexStruct.prototype, "s2", void 0);
__decorate([
    src_1.Field("uint64")
], ComplexStruct.prototype, "uint64", void 0);
ComplexStruct = __decorate([
    src_1.Struct
], ComplexStruct);
console.log("SizeOf(ComplexStruct)=", src_1.SizeOf(ComplexStruct));
const struct = new ComplexStruct();
const view = src_1.GetMetaData(struct, src_1.META.VIEW);
Object.assign(struct.s1, {
    int8: 0x8,
    uint8: 0xF8,
    int16: 0X1616,
    uint16: 0XF6F6,
    int32: 0X32323232,
    uint32: 0XF2F2F2F2,
    int64: 0x6464646464646464n,
    uint64: 0xf4f4f4f4f4f4f4f4fn,
    float32: 0X3F3F3F3F,
    float64: 0X6F6F6F6F6F6F6F6F
});
struct.uint64 = 0x6464646464n;
struct.s1.string[0] = '我666';
struct.s1.string[5] = '发法666345678674574';
struct.s1.string = ["0", "vvvv", "fwag", "fwag", "awrfawr", "awgwag", "grsh", "rhrh", "rgsrh", "aggaeg", "fwf"];
console.log(view.buffer);
console.log([...struct.s1.string]);
const type = src_1.CreateStruct(ComplexStruct, null, 0);
// const x:Readonly<Array<any>>=new Uint8Array();
// @Struct
// class X{
//     private view:DataView;
//     private base:number;
// }
console.log(src_1.SizeOf("float32"));
//# sourceMappingURL=test.js.map