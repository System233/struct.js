import { TypeBase } from "./common";
import { NativeTypes } from "./consts";
import { FieldDef } from "./field";
export declare const SizeOf: (type: typeof TypeBase | TypeBase | NativeTypes) => number;
export declare const AddField: <T extends TypeBase>(target: T, field: FieldDef) => void;
export declare class StructHandler<T extends TypeBase> implements ProxyHandler<T> {
    read(target: T, field: FieldDef): any;
    write(target: T, field: FieldDef, value: any): boolean;
    get(target: T, p: PropertyKey, receiver: any): any;
    set(target: T, p: PropertyKey, value: any, receiver: any): boolean;
}
export declare function InitStruct(target: TypeBase): TypeBase;
