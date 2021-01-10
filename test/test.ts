// Copyright (c) 2021 System233 <https://github.com/System233>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Field, GetMetaData, META, SizeOf, Struct, TypeBase, CreateStruct, Aligned, SetOption, Encoding, BigEndian, Size, Offset, Endian, Dump } from "../src";
import { RunCppTest } from "./utils";


@Struct
@Aligned(1<<10)
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
    @Field("uint32",{
        shape:[10],
        endian:'LE'
    })
    uint32x:number[];
    @Field("string",{
        shape:[10,9],
    })
    string:string[];
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
    @Encoding('E')
    @Endian('BE')
    @BigEndian
    uint64:BigInt;
}
console.log("SizeOf(ComplexStruct)=",SizeOf(ComplexStruct));
console.log(Dump(ComplexStruct))
console.log(Dump(SimpleStruct))
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
struct.s1.string[0]='我666'
struct.s1.string[5]='发法666345678674574'
struct.s1.string=["0","vvvv","fwag","fwag","awrfawr","awgwag","grsh","rhrh","rgsrh","aggaeg","fwf"]
console.log(view.buffer);
console.log([...struct.s1.string]);
const type=CreateStruct(ComplexStruct,null,0);

// const x:Readonly<Array<any>>=new Uint8Array();
// @Struct
// @SetOption()
// class X{
//     private view:DataView;
//     private base:number;
// }
console.log(SizeOf("float32"))
RunCppTest("test",SimpleStruct,ComplexStruct);

