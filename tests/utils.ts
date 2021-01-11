import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { Dump, GetTypeFields, TypeBase } from "../src";
import { GCC_PATH } from "./consts";
const cppTemplate=`
#include <cstdint>
#include <cstdio>
#include <cstddef>
#include <cassert>
#define PRINT(type,member) fprintf(stderr,#type"."#member":+0x%X, sz=%zu\\n",offsetof(type,member),sizeof(type::member));
#define TEST(type,member,offset,size) fprintf(stderr,#type"::"#member"\\t0x%X:0x%X,\\tsz=%zu:%zu,\\t%s\\n",offsetof(type,member),offset,sizeof(type::member),size,(offsetof(type,member)==offset&&sizeof(type::member)==size)?"pass":"fail");
#define TESTx(type,member,offset,size) PRINT(type,member);\\
                            //assert(offsetof(type,member)==offset);\\
                            //assert(sizeof(type::member)==size);`;
export const GenCppMain=(...types:typeof TypeBase[])=>{
    return [
        'int main(){',
        types.map(
            type=>Array.from(GetTypeFields(type).values(),
                field=>`TEST(${type.name},${field.name as any},${field.offset},${field.size});`).join('\n')
        ).join('\n'),
        'return 0;',
        '}'
    ].join('\n');
}
export const GenCppTest=(...types:typeof TypeBase[])=>{
    return [
        cppTemplate,
        ...types.map(Dump),
        GenCppMain(...types)
    ].join('\n');
}
export const GetGccPath=()=>join(GCC_PATH,"g++");
export const RunCppTest=(name:string,...types:typeof TypeBase[])=>{
    const cpp=GenCppTest(...types);
    const cwd=join(__dirname,'temp');
    if(!existsSync(cwd))
        mkdirSync(cwd);
    execSync(GetGccPath()+" -xc++ -&&a",{cwd,input:cpp});
}