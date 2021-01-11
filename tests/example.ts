// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Struct, TypeBase, Field, SizeOf, Dump, Aligned, InitStruct } from "../src";

// 定义结构体

@Struct
@Aligned(16)
class SimpleType extends TypeBase{

    // 定义字段
    @Field("int8")
    int8:number;
    
    @Field("uint8")
    uint8:number;

    //uint64->uint64le
    @Field("int64")
    int64:BigInt;
    
    //uint64be
    @Field("uint64",{endian:'BE'})
    uint64:BigInt;

    //char[10]
    @Field("string",{shape:[10]})
    str10:string

    //char[5][10]
    @Field("string",{shape:[5,10],encoding:'gbk'})
    str10s:string[]

    //定义数组,使用原始数组映射
    @Field("uint64",{shape:[2,3,4]})
    array64:number[][][];
    
    //定义数组,使用TypedArray,地址需要对齐至TypedArray.BYTES_PER_ELEMENT
    @Field("uint64",{shape:[2,3,4],native:true})
    nativeArray64:BigInt64Array[][];
}

// 嵌套类型
@Struct
class ComplexType extends TypeBase{

    @Field(SimpleType)
    s1:SimpleType;

    @Field(SimpleType,{shape:[1,2,3]})
    s2:SimpleType[][][];
}

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
console.log(Dump(SimpleType))
console.log(Dump(ComplexType))