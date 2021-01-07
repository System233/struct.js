// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Field, GetMetaData, META, SizeOf, Struct, TypeBase } from "..";


@Struct
class SimpleStruct extends TypeBase{
    @Field("int8")
    int8:number;
    @Field("int16")
    int16:number;
    @Field("int32")
    int32:number;
    @Field("int64")
    int64:number;
    
    @Field("uint8")
    uint8:number;
    @Field("uint16")
    uint16:number;
    @Field("uint32")
    uint32:number;
    @Field("uint64")
    uint64:number;
}
@Struct
class ComplexStruct extends TypeBase{
 
    @Field(SimpleStruct)
    s1:SimpleStruct;
    @Field(SimpleStruct)
    s2:SimpleStruct;
    
    @Field("uint64")
    uint64:BigInt;
}
console.log("SizeOf(ComplexStruct)=",SizeOf(ComplexStruct));
const struct=new ComplexStruct();
const view:DataView=GetMetaData(struct,META.VIEW);
Object.assign(struct.s1,{
    int8:0x8,
    uint8:0xF8,

    int16:0X1616,
    uint16:0XF6F6,

    int32:0X32323232,
    uint32:0XF2F2F2F2,

    int64:0X6464646464646464n,
    uint64:0XF4F4F4F4F4F4F4F4Fn,

    float32:0X3F3F3F3F,
    float64:0X6F6F6F6F6F6F6F6F
});
struct.uint64=0x6464646464n;
console.log(view.buffer);