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
// 定义结构体
let SimpleType = class SimpleType extends src_1.TypeBase {
};
__decorate([
    src_1.Field("int8")
], SimpleType.prototype, "int8", void 0);
__decorate([
    src_1.Field("uint8")
], SimpleType.prototype, "uint8", void 0);
__decorate([
    src_1.Field("int64")
], SimpleType.prototype, "int64", void 0);
__decorate([
    src_1.Field("uint64", { endian: 'BE' })
], SimpleType.prototype, "uint64", void 0);
__decorate([
    src_1.Field("string", { shape: [10] })
], SimpleType.prototype, "str10", void 0);
__decorate([
    src_1.Field("string", { shape: [5, 10], encoding: 'gbk' })
], SimpleType.prototype, "str10s", void 0);
__decorate([
    src_1.Field("uint64", { shape: [2, 3, 4] })
], SimpleType.prototype, "array64", void 0);
__decorate([
    src_1.Field("uint64", { shape: [2, 3, 4], native: true })
], SimpleType.prototype, "nativeArray64", void 0);
SimpleType = __decorate([
    src_1.Struct,
    src_1.Aligned(16)
], SimpleType);
// 嵌套类型
let ComplexType = class ComplexType extends src_1.TypeBase {
};
__decorate([
    src_1.Field(SimpleType)
], ComplexType.prototype, "s1", void 0);
__decorate([
    src_1.Field(SimpleType, { shape: [1, 2, 3] })
], ComplexType.prototype, "s2", void 0);
ComplexType = __decorate([
    src_1.Struct
], ComplexType);
// 继承类型(尚未测试)
//@Struct
//class ExtendsType extends ComplexType{}
// // 打印结构体类型
// console.log("SizeOf(SimpleStruct)=",SizeOf(SimpleType));
// console.log("SizeOf(ComplexType)=",SizeOf(ComplexType));
// // 实例化结构
// const buffer=new ArrayBuffer(SizeOf(SimpleType));
// const struct=new SimpleType(buffer);
// // 测试赋值
// struct.int8=0x80;
// struct.uint8=0xF0;
// /*...*/
// struct.str10="测试utf8"
// struct.str10s=["我额","字符","test","emmm","end"]
// struct.int64=0x6465666768696A6Bn;
// struct.uint64=0xF4F5F6F7F8F9FAFBn;
// // 打印结构
// console.log("int8=",struct.int64);
// console.log("uint8=",struct.uint64);
// console.log("str10=",struct.str10);
// console.log("str10s[0]=",struct.str10s[0]);
// console.log("str10s[1]=",struct.str10s[1]);
// console.log("str10s=",[...struct.str10s]);
// console.log("int64=",struct.int64);
// console.log("uint64=",struct.uint64);
// console.log(buffer)
console.log(src_1.Dump(SimpleType));
console.log(src_1.Dump(ComplexType));
//# sourceMappingURL=example.js.map