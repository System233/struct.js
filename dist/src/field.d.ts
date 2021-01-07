import { TypeBase } from "./common";
import { NativeTypes } from "./consts";
export interface FieldDef {
    name?: PropertyKey;
    type?: typeof TypeBase | NativeTypes;
    offset?: number;
    size?: number;
    native?: boolean;
    shape?: number[];
}
export declare type Fields = {
    [key in PropertyKey]: FieldDef;
};
