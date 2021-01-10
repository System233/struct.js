import { TypeBase } from "./common";
import { Endianness, NativeTypeMap, NativeTypes } from "./consts";
import { FieldDef, FieldNativeDef, FieldOption, FieldStringDef, FieldTypeDef } from "./field";
export declare function GetNativeTypeDef<T extends keyof NativeTypeMap>(type: T): {
    get(view: DataView, offset: number, endian?: Endianness): any;
    set(view: DataView, offset: number, value: NativeTypeMap[T][0], endian?: Endianness): void;
};
export declare const NativeTypeDef: {
    int8: {
        get(view: DataView, offset: number, endian?: Endianness): any;
        set(view: DataView, offset: number, value: number, endian?: Endianness): void;
    };
    uint8: {
        get(view: DataView, offset: number, endian?: Endianness): any;
        set(view: DataView, offset: number, value: number, endian?: Endianness): void;
    };
    int16: {
        get(view: DataView, offset: number, endian?: Endianness): any;
        set(view: DataView, offset: number, value: number, endian?: Endianness): void;
    };
    uint16: {
        get(view: DataView, offset: number, endian?: Endianness): any;
        set(view: DataView, offset: number, value: number, endian?: Endianness): void;
    };
    int32: {
        get(view: DataView, offset: number, endian?: Endianness): any;
        set(view: DataView, offset: number, value: number, endian?: Endianness): void;
    };
    uint32: {
        get(view: DataView, offset: number, endian?: Endianness): any;
        set(view: DataView, offset: number, value: number, endian?: Endianness): void;
    };
    int64: {
        get(view: DataView, offset: number, endian?: Endianness): any;
        set(view: DataView, offset: number, value: BigInt, endian?: Endianness): void;
    };
    uint64: {
        get(view: DataView, offset: number, endian?: Endianness): any;
        set(view: DataView, offset: number, value: BigInt, endian?: Endianness): void;
    };
    float32: {
        get(view: DataView, offset: number, endian?: Endianness): any;
        set(view: DataView, offset: number, value: number, endian?: Endianness): void;
    };
    float64: {
        get(view: DataView, offset: number, endian?: Endianness): any;
        set(view: DataView, offset: number, value: number, endian?: Endianness): void;
    };
};
export declare const IsNativeType: (type: any) => type is "int8" | "uint8" | "int16" | "uint16" | "int32" | "uint32" | "int64" | "uint64" | "float32" | "float64";
export declare const IsNativeField: (field: FieldDef | FieldOption) => field is FieldNativeDef;
export declare const IsCustomType: (type: any) => type is typeof TypeBase;
export declare const IsCustomField: (field: FieldDef | FieldOption) => field is FieldTypeDef;
export declare const IsStringType: (type: any) => type is "string";
export declare const IsStringField: (field: FieldDef | FieldOption) => field is FieldStringDef;
export declare const SizeOf: (type: typeof TypeBase | TypeBase | NativeTypes) => number;
export declare const DeepAssign: <T extends Object>(target: T, ...args: object[]) => T;
export declare const DumpField: (field: FieldDef, deep?: number) => string;
export declare const DumpStruct: <T extends typeof TypeBase | TypeBase>(type: T) => string;
export declare const Dump: <T extends FieldDef | typeof TypeBase | TypeBase>(type: T) => string;
//# sourceMappingURL=utils.d.ts.map