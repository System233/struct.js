#include <cstdint>
#include <cstdio>
#include <cstddef>
#define PRINT(type,member) printf(#type"."#member"->\t+%d, sz=%zu\n",offsetof(type,member),sizeof(type::member));
#define TEST(type,member,offset,size) PRINT(type,member);\
                            assert(offsetof(type,member)==offset);\
                            assert(sizeof(type::member)==size);

class SimpleType{       //480, align=16
public:
    int8_t    int8;   //+0x0, 1
    uint8_t   uint8;  //+0x1, 1
    int64_t   int64;  //+0x8, 8
    uint64_t  uint64; //+0x10, 8
    char  str10[10];      //+0x18, 10
    char  str10s[5][10];  //+0x22, 50, gbk
    uint64_t  array64[2][3][4];       //+0x58, 192
    uint64_t  nativeArray64[2][3][4]; //+0x118, 192, native
};
class ComplexType{      //3360, align=16
        SimpleType      s1;     //+0x0, 480
        SimpleType      s2[1][2][3];    //+0x1E0, 2880
} __attribute__((aligned(2)));
class ComplexType{      //3360, align=4
public:
    SimpleType      s1;     //+0x0, 480
    SimpleType      s2;    //+0x1E0, 2880
};
struct Example{//sizeof=16
    int8_t i8;  //+0
    int32_t i32;//+4
    int32_t i64;//+8
    int8_t i8x2;//+16
};
int main(int argc, char const *argv[])
{
    /* code */
    // printf("sizeof(SimpleType)=%zu\n",sizeof(SimpleType));
    // printf("sizeof(ComplexType)=%zu\n",sizeof(ComplexType));
    PRINT(SimpleType,int8);
    PRINT(SimpleType,uint8);
    // // PRINT(SimpleType,uint8);
    // // PRINT(SimpleType,int32);
    // PRINT(ComplexType,s1);
    // PRINT(ComplexType,s2);
    // printf("sizeof(Example)=%zu\n",sizeof(Example));
    // PRINT(Example,i8);
    // PRINT(Example,i32);
    // PRINT(Example,i64);
    // PRINT(Example,i8x2);
    // TEST(SimpleType,uint8,0,0);
    return 0;
}
