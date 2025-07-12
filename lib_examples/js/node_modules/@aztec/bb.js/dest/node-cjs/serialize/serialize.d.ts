export declare function boolToBuffer(b: boolean): Uint8Array;
export declare function numToUInt32LE(n: number, bufferSize?: number): Uint8Array;
export declare function numToUInt32BE(n: number, bufferSize?: number): Uint8Array;
export declare function numToInt32BE(n: number, bufferSize?: number): Uint8Array;
export declare function numToUInt8(n: number): Uint8Array;
export declare function concatenateUint8Arrays(arrayOfUint8Arrays: Uint8Array[]): Uint8Array;
export declare function uint8ArrayToHexString(uint8Array: Uint8Array): string;
export declare function serializeBufferToVector(buf: Uint8Array): Uint8Array;
export declare function serializeBigInt(n: bigint, width?: number): Uint8Array;
export declare function deserializeBigInt(buf: Uint8Array, offset?: number, width?: number): {
    elem: bigint;
    adv: number;
};
export declare function serializeDate(date: Date): Uint8Array;
export declare function deserializeBufferFromVector(vector: Uint8Array, offset?: number): {
    elem: Uint8Array;
    adv: number;
};
export declare function deserializeBool(buf: Uint8Array, offset?: number): {
    elem: boolean;
    adv: number;
};
export declare function deserializeUInt32(buf: Uint8Array, offset?: number): {
    elem: number;
    adv: number;
};
export declare function deserializeInt32(buf: Uint8Array, offset?: number): {
    elem: number;
    adv: number;
};
export declare function deserializeField(buf: Uint8Array, offset?: number): {
    elem: Uint8Array;
    adv: number;
};
export declare function serializeBufferArrayToVector(arr: Uint8Array[]): Uint8Array;
export declare function deserializeArrayFromVector<T>(deserialize: (buf: Uint8Array, offset: number) => {
    elem: T;
    adv: number;
}, vector: Uint8Array, offset?: number): {
    elem: T[];
    adv: number;
};
/** A type that can be written to a buffer. */
export type Bufferable = boolean | Uint8Array | number | string | {
    toBuffer: () => Uint8Array;
} | Bufferable[];
/**
 * Serializes a list of objects contiguously for calling into wasm.
 * @param objs - Objects to serialize.
 * @returns A buffer list with the concatenation of all fields.
 */
export declare function serializeBufferable(obj: Bufferable): Uint8Array;
//# sourceMappingURL=serialize.d.ts.map