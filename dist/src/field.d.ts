import { TypeBase } from "./common";
import { Endianness, NativeType, StringType } from "./consts";
export interface FieldDef {
    type: NativeType | typeof TypeBase | StringType;
    name: PropertyKey;
    offset: number;
    aligned: number;
    size: number;
    native: boolean;
    shape: number[];
    encoding: string;
    endian: Endianness;
}
export interface FieldNativeDef extends Partial<FieldDef> {
    type?: NativeType;
    endian?: Endianness;
    encoding?: never;
}
export interface FieldTypeDef extends Partial<FieldDef> {
    type?: typeof TypeBase;
    endian?: never;
    encoding?: never;
}
export interface FieldStringDef extends Partial<FieldDef> {
    type?: "string";
    encoding?: string;
    endian?: never;
    native?: never;
}
export declare type FieldOption = FieldTypeDef | FieldNativeDef | FieldStringDef;
export declare type FiledType = NativeType | typeof TypeBase | StringType;
export declare type Fields = Map<PropertyKey, FieldDef>;
//# sourceMappingURL=field.d.ts.map