import { TypeBase } from "./common";
import { Endianness, NativeTypes as NativeType } from "./consts";
export interface FieldDef {
    type: NativeType | typeof TypeBase | "string";
    name: PropertyKey;
    offset: number;
    size: number;
    native?: boolean;
    shape?: number[];
    encoding?: Endianness | string;
}
export interface FieldNativeDef extends Partial<FieldDef> {
    type?: NativeType;
    encoding?: Endianness;
}
export interface FieldTypeDef extends Partial<FieldDef> {
    type?: typeof TypeBase;
    encoding?: never;
}
export interface FieldStringDef extends Partial<FieldDef> {
    type?: "string";
    encoding?: string;
}
export declare type FieldOption = FieldTypeDef | FieldNativeDef | FieldStringDef;
export declare type FiledType = NativeType | typeof TypeBase | "string";
export declare type Fields = {
    [key in PropertyKey]: FieldDef;
};
//# sourceMappingURL=field.d.ts.map