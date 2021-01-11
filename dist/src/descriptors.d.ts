import { TypeBase, TypeOption } from "./common";
import { Endianness } from "./consts";
import { FieldOption } from "./field";
export declare const Field: <T extends "string" | "int8" | "uint8" | "int16" | "uint16" | "int32" | "uint32" | "int64" | "uint64" | "float32" | "float64" | typeof TypeBase>(type: T, option?: Partial<import("./field").FieldNativeDef & {
    type: T;
}> | Partial<import("./field").FieldTypeDef & {
    type: T;
}> | Partial<import("./field").FieldStringDef & {
    type: T;
}>) => PropertyDecorator;
export declare const SetOption: {
    (option: TypeOption & FieldOption): (target: TypeBase | typeof TypeBase, propertyKey?: string | symbol) => void;
    (option: TypeOption): <T extends typeof TypeBase>(target: T) => void;
    (option: FieldOption): <T extends TypeBase>(target: T, propertyKey: string | symbol) => void;
};
interface OptionSetter<T> {
    (value: T): (target: TypeBase | typeof TypeBase, propertyKey?: PropertyKey) => void;
    (target: TypeBase | typeof TypeBase): void;
}
export declare const Packed: OptionSetter<boolean>;
export declare const Native: OptionSetter<boolean>;
export declare const Aligned: (aligned: number) => (target: TypeBase | typeof TypeBase, propertyKey?: string | symbol) => void;
export declare const Encoding: (encoding: string) => (target: TypeBase | typeof TypeBase, propertyKey?: string | symbol) => void;
export declare const Endian: (endian: Endianness) => (target: TypeBase | typeof TypeBase, propertyKey?: string | symbol) => void;
export declare const Offset: (offset: number) => (target: TypeBase | typeof TypeBase, propertyKey?: string | symbol) => void;
export declare const Size: (size: number) => (target: TypeBase | typeof TypeBase, propertyKey?: string | symbol) => void;
export declare const Shape: (...shape: number[]) => (target: TypeBase | typeof TypeBase, propertyKey?: string | symbol) => void;
export declare const Length: (...shape: number[]) => (target: TypeBase | typeof TypeBase, propertyKey?: string | symbol) => void;
export declare const BigEndian: <T extends TypeBase>(target: T, propertyKey: string | symbol) => void;
export declare const LittleEndian: <T extends TypeBase>(target: T, propertyKey: string | symbol) => void;
export declare const Struct: {
    <T extends typeof TypeBase>(constructor: T, type?: TypeOption): T;
    (type: TypeOption): <T extends typeof TypeBase>(target: T) => T;
};
export {};
//# sourceMappingURL=descriptors.d.ts.map