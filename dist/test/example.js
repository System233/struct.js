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
// 定义结构体
let SimpleType = class SimpleType extends __1.TypeBase {
};
__decorate([
    __1.Field("int8")
], SimpleType.prototype, "int8", void 0);
__decorate([
    __1.Field("int16")
], SimpleType.prototype, "int16", void 0);
__decorate([
    __1.Field("int32")
], SimpleType.prototype, "int32", void 0);
__decorate([
    __1.Field("int64")
], SimpleType.prototype, "int64", void 0);
__decorate([
    __1.Field("uint8")
], SimpleType.prototype, "uint8", void 0);
__decorate([
    __1.Field("uint16")
], SimpleType.prototype, "uint16", void 0);
__decorate([
    __1.Field("uint32")
], SimpleType.prototype, "uint32", void 0);
__decorate([
    __1.Field("uint64")
], SimpleType.prototype, "uint64", void 0);
__decorate([
    __1.Field("uint64", { shape: [2, 3, 4] })
], SimpleType.prototype, "array64", void 0);
__decorate([
    __1.Field("uint64", { shape: [2, 3, 4], native: true })
], SimpleType.prototype, "nativeArray64", void 0);
SimpleType = __decorate([
    __1.Struct
], SimpleType);
// 嵌套类型
let ComplexType = class ComplexType extends __1.TypeBase {
};
__decorate([
    __1.Field(SimpleType)
], ComplexType.prototype, "s1", void 0);
__decorate([
    __1.Field(SimpleType, { shape: [1, 2, 3] })
], ComplexType.prototype, "s2", void 0);
ComplexType = __decorate([
    __1.Struct
], ComplexType);
// 继承类型(尚未测试)
// 打印结构体类型
console.log("SizeOf(SimpleStruct)=", __1.SizeOf(SimpleType));
console.log("SizeOf(ComplexType)=", __1.SizeOf(ComplexType));
// 实例化结构
const buffer = new ArrayBuffer(__1.SizeOf(SimpleType));
const struct = new SimpleType(buffer);
// 测试赋值
struct.int8 = 0x80;
struct.uint8 = 0x80;
/*...*/
struct.int64 = 0x6464646464646464n;
struct.uint64 = 0xf4f4f4f4f4f4f4f4n;
// 打印结构
console.log("int64=", struct.int64);
console.log("uint64=", struct.uint64);
console.log(buffer);
