"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunCppTest = exports.GetGccPath = exports.GenCppTest = exports.GenCppMain = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const src_1 = require("../src");
const consts_1 = require("./consts");
const cppTemplate = `
#include <cstdint>
#include <cstdio>
#include <cstddef>
#include <cassert>
#define PRINT(type,member) fprintf(stderr,#type"."#member":+0x%X, sz=%zu\\n",offsetof(type,member),sizeof(type::member));
#define TEST(type,member,offset,size) fprintf(stderr,#type"::"#member"\\t0x%X:0x%X,\\tsz=%zu:%zu,\\t%s\\n",offsetof(type,member),offset,sizeof(type::member),size,(offsetof(type,member)==offset&&sizeof(type::member)==size)?"pass":"fail");
#define TESTx(type,member,offset,size) PRINT(type,member);\\
                            //assert(offsetof(type,member)==offset);\\
                            //assert(sizeof(type::member)==size);`;
const GenCppMain = (...types) => {
    return [
        'int main(){',
        types.map(type => Array.from(src_1.GetTypeFields(type).values(), field => `TEST(${type.name},${field.name},${field.offset},${field.size});`).join('\n')).join('\n'),
        'return 0;',
        '}'
    ].join('\n');
};
exports.GenCppMain = GenCppMain;
const GenCppTest = (...types) => {
    return [
        cppTemplate,
        ...types.map(src_1.Dump),
        exports.GenCppMain(...types)
    ].join('\n');
};
exports.GenCppTest = GenCppTest;
const GetGccPath = () => path_1.join(consts_1.GCC_PATH, "g++");
exports.GetGccPath = GetGccPath;
const RunCppTest = (name, ...types) => {
    const cpp = exports.GenCppTest(...types);
    const cwd = path_1.join(__dirname, 'temp');
    if (!fs_1.existsSync(cwd))
        fs_1.mkdirSync(cwd);
    child_process_1.execSync(exports.GetGccPath() + " -xc++ -&&a", { cwd, input: cpp });
};
exports.RunCppTest = RunCppTest;
//# sourceMappingURL=utils.js.map