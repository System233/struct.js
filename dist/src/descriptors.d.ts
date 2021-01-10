import { TypeBase } from "./common";
import { FieldOption } from "./field";
export declare const Field: <T extends "string" | "int8" | "uint8" | "int16" | "uint16" | "int32" | "uint32" | "int64" | "uint64" | "float32" | "float64" | typeof TypeBase>(type: T, option?: Partial<import("./field").FieldNativeDef & {
    type: T;
}> | Partial<import("./field").FieldTypeDef & {
    type: T;
}> | Partial<import("./field").FieldStringDef & {
    type: T;
}>) => PropertyDecorator;
export declare const Struct: <T extends typeof TypeBase>(constructor: T) => T;
//# sourceMappingURL=descriptors.d.ts.map