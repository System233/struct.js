import { TypeBase, TypeDef, TypeOption } from "./common";
import { Endianness, NativeTypeMap, NativeType, NativeTypeSize, StringType } from "./consts";
import { FieldDef, FieldNativeDef, FieldOption, Fields, FieldStringDef, FieldTypeDef } from "./field";
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
export declare const SizeOf: (type: typeof TypeBase | TypeBase | NativeType, real?: boolean) => number;
export declare const DeepAssign: <T extends Object>(target: T, ...args: object[]) => T;
export declare const TypeToCpp: (type: NativeType | typeof TypeBase | StringType) => string;
export declare const DumpField: (field: FieldDef, deep?: number) => string;
export declare const DumpType: <T extends typeof TypeBase | TypeBase>(type: T) => string;
export declare const Dump: <T extends FieldDef | typeof TypeBase | TypeBase>(type: T) => string;
export declare const Aligns: (addr: number, align: NativeTypeSize) => number;
export declare const GetTypeDef: <T extends TypeBase>(target: T) => TypeDef;
export declare const SetTypeDef: <T extends TypeBase>(target: T, option: TypeOption) => void;
export declare const GetFieldDef: <T extends TypeBase>(target: T, name: PropertyKey) => FieldDef;
export declare const SetFieldDef: <T extends TypeBase>(target: T, name: PropertyKey, option: FieldOption) => void;
export declare const GetDefaultAlign: (type: typeof TypeBase | NativeType | StringType) => number;
export declare const SetDefaultAlign: (type: typeof TypeBase, align: number) => boolean;
export declare const NullOrDef: <T>(...items: T[]) => T;
export declare const GetTypeFields: <T extends TypeBase>(type: T) => Fields;
export declare const SetTypeFields: <T extends TypeBase>(type: T, fields: Fields) => boolean;
export declare const IsTypeInited: <T extends TypeBase>(type: T) => boolean;
export declare const SetTypeInited: <T extends TypeBase>(type: T, inited: boolean) => boolean;
//# sourceMappingURL=utils.d.ts.map