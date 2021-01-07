import { TypeBase } from "./common";
import { NativeTypes } from "./consts";
import { FieldDef } from "./field";
export declare const Field: (type: NativeTypes | typeof TypeBase, option?: FieldDef) => PropertyDecorator;
export declare const Struct: <T extends new (...args: any[]) => TypeBase>(constructor: T) => {
    new (...args: any[]): {};
} & T;
