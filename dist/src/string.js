"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteAsString = exports.ReadAsString = void 0;
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const consts_1 = require("./consts");
exports.ReadAsString = (buffer, byteOffset, byteLength, encoding) => {
    return iconv_lite_1.default.decode(Buffer.from(buffer, byteOffset, byteLength), encoding || consts_1.DefaultEncoding);
};
exports.WriteAsString = (buffer, byteOffset, byteLength, encoding, value) => {
    return iconv_lite_1.default.encode(value, encoding || consts_1.DefaultEncoding).copy(new Uint8Array(buffer, byteOffset, byteLength));
};
//# sourceMappingURL=string.js.map