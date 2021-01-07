# Struct.js

🧀C风格二进制数据读写器（实验性🚩）

## 🧡支持的类型

✔支持的基本类型:`int8`,`uint8`,`int16`,`uint16`,`int32`,`uint32`,`int64`,`uint64`,`float32`,`float64`

❌尚不支持的类型:`string`

## 🚀示例

`npm install https://github.com/System233/struct.js`

[example.ts](test/example.ts)

```typescript

import { Struct, TypeBase, Field, SizeOf } from "struct";

// 定义结构体
@Struct
class SimpleType extends TypeBase{

    // 定义字段
    @Field("int8")
    int8:number;

    @Field("int16")
    int16:number;

    @Field("int32")
    int32:number;

    @Field("int64")
    int64:BigInt;
    
    @Field("uint8")
    uint8:number;

    @Field("uint16")
    uint16:number;

    @Field("uint32")
    uint32:number;

    @Field("uint64")
    uint64:BigInt;


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

// 打印类型大小
console.log("SizeOf(SimpleStruct)=",SizeOf(SimpleType));
console.log("SizeOf(ComplexType)=",SizeOf(ComplexType));

// 实例化结构
const buffer=new ArrayBuffer(SizeOf(SimpleType));
const struct=new SimpleType(buffer);

// 测试赋值
struct.int8=0x80;
struct.uint8=0x80;
/*...*/
struct.int64=0x6464646464646464n;
struct.uint64=0xF4F4F4F4F4F4F4F4n;

// 打印结构
console.log("int64=",struct.int64);
console.log("uint64=",struct.uint64);
console.log(buffer)

```

## 📌TODO

- [ ] 基本类型`string`支持
- [ ] Little/Big-Endian 字节序
- [ ] Byte-Algined 字节对齐
- [ ] Extends 继承类型
- [ ] Union 联合类型
- [ ] JavaScript API

## 🔑LICENSE

MIT Copyright (c) [System233](https://github.com/System233)