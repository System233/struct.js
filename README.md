# Struct.js

🧀C风格二进制数据读写器（实验性🚩）  

`npm install https://github.com/System233/struct.js`

## 🧡支持的类型

✔支持的基本类型:`string`,`int8`,`uint8`,`int16`,`uint16`,`int32`,`uint32`,`int64`,`uint64`,`float32`,`float64`

❌尚不支持的类型: bool

## 🚀示例

### TypeScript

[example.ts](tests/example.ts)

```typescript
import { Struct, TypeBase, Field, SizeOf, Dump } from "../src";

// 定义结构体
@Struct
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
    @Field("uint64",{encoding:'BE'})
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

// 打印结构体类型
console.log("SizeOf(SimpleStruct)=",SizeOf(SimpleType));
console.log("SizeOf(ComplexType)=",SizeOf(ComplexType));

// 实例化结构
const buffer=new ArrayBuffer(SizeOf(SimpleType));
const struct=new SimpleType(buffer);

// 测试赋值
struct.int8=0x80;
struct.uint8=0xF0;
/*...*/
struct.str10="测试utf8"
struct.str10s=["我额","字符","test","emmm","end"]
struct.int64=0x6465666768696A6Bn;
struct.uint64=0xF4F5F6F7F8F9FAFBn;

// 打印结构
console.log("int8=",struct.int64);
console.log("uint8=",struct.uint64);
console.log("str10=",struct.str10);
console.log("str10s[0]=",struct.str10s[0]);
console.log("str10s[1]=",struct.str10s[1]);
console.log("str10s=",[...struct.str10s]);
console.log("int64=",struct.int64);
console.log("uint64=",struct.uint64);
console.log(buffer)
console.log(Dump(SimpleType))
console.log(Dump(ComplexType))

```

### JavaScript

[example.js](tests/example.js)

```javascript
const { TypeBase, DefineFields } = require("struct");

class Test extends TypeBase{

    print(){
        console.log('this.i8=',this.i8);
    }
}

DefineFields(Test,
    {
        type:'string',
        name:'str',
        shape:[10],
        encoding:'utf8'
    },
    {
        type:'int8',
        name:'i8'
    },
    {
        type:"float32",
        name:'f32'
    }
);
console.log(Test.dump());
const test=Test.create();
test.print()
test.i8=0xFF;
test.print()

console.log(test.buffer);
```

## 文档

暂时没有文档，只能导入后按照字面意思理解。

## 📌TODO

- [x] `string`类型支持
- [x] Little/Big-Endian 字节序
- [x] Byte-Aligned 字节对齐
- [ ] Extends 继承类型
- [ ] Union 联合类型
- [x] JavaScript API

## 🔑LICENSE

MIT Copyright (c) [System233](https://github.com/System233)