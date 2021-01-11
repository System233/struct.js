import { TypeBase } from "./common";
import { FieldDef, FieldOption } from "./field";
export declare const AddField: <T extends typeof TypeBase>(target: T, field: FieldDef) => void;
export declare const InitStruct: <T extends typeof TypeBase>(type: T) => void;
export declare class StructHandler<T extends TypeBase> implements ProxyHandler<T> {
    read(target: T, field: FieldDef): any;
    write(target: T, field: FieldDef, value: any): boolean;
    has(target: T, p: PropertyKey): boolean;
    get(target: T, p: PropertyKey, receiver: any): any;
    set(target: T, p: PropertyKey, value: any, receiver: any): boolean;
    static create<T extends typeof TypeBase>(type: T, ...args: ConstructorParameters<T>): InstanceType<T>;
    static create<T extends TypeBase>(target: T): T;
}
export declare const CreateStruct: {
    <T extends typeof TypeBase>(type: T, ...args: ConstructorParameters<T>): InstanceType<T>;
    <T extends TypeBase>(target: T): T;
};
export declare const DefineFields: <T extends typeof TypeBase>(type: T, ...fields: ((import("./field").FieldNativeDef & {
    type: FieldDef["type"];
    name: FieldDef["name"];
}) | (import("./field").FieldTypeDef & {
    type: FieldDef["type"];
    name: FieldDef["name"];
}) | (import("./field").FieldStringDef & {
    type: FieldDef["type"];
    name: FieldDef["name"];
}))[]) => T;
//# sourceMappingURL=types.d.ts.map