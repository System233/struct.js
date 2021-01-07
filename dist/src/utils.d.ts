import { NativeTypeMap } from "./consts";
export declare function GetNativeTypeDef<T extends keyof NativeTypeMap>(type: T): {
    get(view: DataView, offset: number): any;
    set(view: DataView, offset: number, value: NativeTypeMap[T][0]): void;
};
export declare const NativeTypeDef: {
    int8: {
        get(view: DataView, offset: number): any;
        set(view: DataView, offset: number, value: number): void;
    };
    uint8: {
        get(view: DataView, offset: number): any;
        set(view: DataView, offset: number, value: number): void;
    };
    int16: {
        get(view: DataView, offset: number): any;
        set(view: DataView, offset: number, value: number): void;
    };
    uint16: {
        get(view: DataView, offset: number): any;
        set(view: DataView, offset: number, value: number): void;
    };
    int32: {
        get(view: DataView, offset: number): any;
        set(view: DataView, offset: number, value: number): void;
    };
    uint32: {
        get(view: DataView, offset: number): any;
        set(view: DataView, offset: number, value: number): void;
    };
    int64: {
        get(view: DataView, offset: number): any;
        set(view: DataView, offset: number, value: BigInt): void;
    };
    uint64: {
        get(view: DataView, offset: number): any;
        set(view: DataView, offset: number, value: BigInt): void;
    };
    float32: {
        get(view: DataView, offset: number): any;
        set(view: DataView, offset: number, value: number): void;
    };
    float64: {
        get(view: DataView, offset: number): any;
        set(view: DataView, offset: number, value: number): void;
    };
};
