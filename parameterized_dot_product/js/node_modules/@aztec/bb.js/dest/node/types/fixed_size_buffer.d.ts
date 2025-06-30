import { BufferReader } from '../serialize/index.js';
export declare class Buffer32 {
    readonly buffer: Uint8Array;
    static SIZE_IN_BYTES: number;
    constructor(buffer: Uint8Array);
    static fromBuffer(buffer: Uint8Array | BufferReader): Buffer32;
    static random(): Buffer32;
    toBuffer(): Uint8Array;
}
export declare class Buffer64 {
    readonly buffer: Uint8Array;
    static SIZE_IN_BYTES: number;
    constructor(buffer: Uint8Array);
    static fromBuffer(buffer: Uint8Array | BufferReader): Buffer64;
    static random(): Buffer64;
    toBuffer(): Uint8Array;
}
export declare class Buffer128 {
    readonly buffer: Uint8Array;
    static SIZE_IN_BYTES: number;
    constructor(buffer: Uint8Array);
    static fromBuffer(buffer: Uint8Array | BufferReader): Buffer128;
    static random(): Buffer128;
    toBuffer(): Uint8Array;
}
//# sourceMappingURL=fixed_size_buffer.d.ts.map