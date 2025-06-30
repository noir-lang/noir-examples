export declare class BufferReader {
    private buffer;
    private index;
    constructor(buffer: Uint8Array, offset?: number);
    static asReader(bufferOrReader: Uint8Array | BufferReader): BufferReader;
    readNumber(): number;
    readBoolean(): boolean;
    readBytes(n: number): Uint8Array;
    readNumberVector(): number[];
    readVector<T>(itemDeserializer: {
        fromBuffer: (reader: BufferReader) => T;
    }): T[];
    readArray<T>(size: number, itemDeserializer: {
        fromBuffer: (reader: BufferReader) => T;
    }): T[];
    readObject<T>(deserializer: {
        fromBuffer: (reader: BufferReader) => T;
    }): T;
    peekBytes(n?: number): Uint8Array;
    readString(): string;
    readBuffer(): Uint8Array;
    readMap<T>(deserializer: {
        fromBuffer: (reader: BufferReader) => T;
    }): {
        [key: string]: T;
    };
}
//# sourceMappingURL=buffer_reader.d.ts.map