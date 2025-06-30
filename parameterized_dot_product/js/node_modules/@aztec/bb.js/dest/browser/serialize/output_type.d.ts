import { BufferReader } from './buffer_reader.js';
export interface OutputType<T = any> {
    SIZE_IN_BYTES?: number;
    fromBuffer: (b: Uint8Array | BufferReader) => T;
}
export declare function BoolDeserializer(): OutputType;
export declare function NumberDeserializer(): OutputType;
export declare function VectorDeserializer<T>(t: OutputType<T>): OutputType;
export declare function BufferDeserializer(): OutputType;
export declare function StringDeserializer(): OutputType;
//# sourceMappingURL=output_type.d.ts.map