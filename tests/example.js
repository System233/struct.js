const { TypeBase, DefineFields } = require("..");

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