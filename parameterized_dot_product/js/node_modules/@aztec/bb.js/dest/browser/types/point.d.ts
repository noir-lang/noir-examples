/// <reference types="node" resolution-mode="require"/>
import { Fr } from './index.js';
import { BufferReader } from '../serialize/buffer_reader.js';
export declare class Point {
    readonly x: Fr;
    readonly y: Fr;
    static SIZE_IN_BYTES: number;
    static EMPTY: Point;
    constructor(x: Fr, y: Fr);
    static random(): Point;
    static fromBuffer(buffer: Uint8Array | BufferReader): Point;
    static fromString(address: string): Point;
    toBuffer(): Buffer;
    toString(): string;
    equals(rhs: Point): boolean;
}
//# sourceMappingURL=point.d.ts.map