import { BufferReader } from '../serialize/index.js';
/**
 * Holds an opaque pointer into WASM memory.
 * Currently only 4 bytes, but could grow to 8 bytes with wasm64.
 */
export declare class Ptr {
    readonly value: Uint8Array;
    static SIZE_IN_BYTES: number;
    constructor(value: Uint8Array);
    static fromBuffer(buffer: Uint8Array | BufferReader): Ptr;
    toBuffer(): Uint8Array;
}
//# sourceMappingURL=ptr.d.ts.map