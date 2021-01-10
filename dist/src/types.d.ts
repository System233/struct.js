import { TypeBase } from "./common";
import { FieldDef, FieldOption } from "./field";
export declare const AddField: <T extends TypeBase>(target: T, field: FieldOption) => void;
export declare class StructHandler<T extends TypeBase> implements ProxyHandler<T> {
    read(target: T, field: FieldDef): any;
    write(target: T, field: FieldDef, value: any): boolean;
    get(target: T, p: PropertyKey, receiver: any): any;
    set(target: T, p: PropertyKey, value: any, receiver: any): boolean;
    static create<T extends typeof TypeBase>(type: T, ...args: ConstructorParameters<T>): InstanceType<T>;
    static create<T extends TypeBase>(target: T): T;
}
export declare const CreateStruct: {
    <T extends TypeBase>(target: T): T;
    <T extends typeof TypeBase>(type: T, ...args: ConstructorParameters<T>): InstanceType<T>;
};
//# sourceMappingURL=types.d.ts.map