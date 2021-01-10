import iconv from "iconv-lite"
import { DefaultEncoding } from "./consts";

export const ReadAsString=(buffer:ArrayBufferLike,byteOffset:number,byteLength:number,encoding:string):string=>{
    return iconv.decode(Buffer.from(buffer,byteOffset,byteLength),encoding||DefaultEncoding);
}
export const WriteAsString=(buffer:ArrayBufferLike,byteOffset:number,byteLength:number,encoding:string,value:string):number=>{
    return iconv.encode(value,encoding||DefaultEncoding).copy(new Uint8Array(buffer,byteOffset,byteLength));
}