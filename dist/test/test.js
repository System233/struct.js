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
const __1 = require("..");
let SimpleStruct = class SimpleStruct extends __1.TypeBase {
};
__decorate([
    __1.Field("int8")
], SimpleStruct.prototype, "int8", void 0);
__decorate([
    __1.Field("int16")
], SimpleStruct.prototype, "int16", void 0);
__decorate([
    __1.Field("int32")
], SimpleStruct.prototype, "int32", void 0);
__decorate([
    __1.Field("int64")
], SimpleStruct.prototype, "int64", void 0);
__decorate([
    __1.Field("uint8")
], SimpleStruct.prototype, "uint8", void 0);
__decorate([
    __1.Field("uint16")
], SimpleStruct.prototype, "uint16", void 0);
__decorate([
    __1.Field("uint32")
], SimpleStruct.prototype, "uint32", void 0);
__decorate([
    __1.Field("uint64")
], SimpleStruct.prototype, "uint64", void 0);
SimpleStruct = __decorate([
    __1.Struct
], SimpleStruct);
let ComplexStruct = class ComplexStruct extends __1.TypeBase {
};
__decorate([
    __1.Field(SimpleStruct)
], ComplexStruct.prototype, "s1", void 0);
__decorate([
    __1.Field(SimpleStruct)
], ComplexStruct.prototype, "s2", void 0);
__decorate([
    __1.Field("uint64")
], ComplexStruct.prototype, "uint64", void 0);
ComplexStruct = __decorate([
    __1.Struct
], ComplexStruct);
console.log("SizeOf(ComplexStruct)=", __1.SizeOf(ComplexStruct));
const struct = new ComplexStruct();
const view = __1.GetMetaData(struct, __1.META.VIEW);
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
console.log(view.buffer);
