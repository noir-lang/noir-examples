import { Point } from '@noble/secp256k1';
import { HashedPoint } from './utils/curve.js';
export declare enum PlumeVersion {
    V1 = 1,
    V2 = 2
}
export declare function computeHashToCurve(message: Uint8Array, pk: Uint8Array): HashedPoint;
export declare function computeC_V2(nullifier: Point, rPoint: Point, hashedToCurveR: Point, hasher: any): any;
export declare function computeC_V1(pkBytes: Uint8Array, hashedToCurve: HashedPoint, nullifier: Point, rPoint: Point, hashedToCurveR: Point, hasher: any): any;
export declare function computeNullifer(hashedToCurve: HashedPoint, sk: Uint8Array): Point;
export declare function computeRPoint(rScalar: Uint8Array): Point;
export declare function computeHashToCurveR(hashedToCurve: HashedPoint, rScalar: Uint8Array): Point;
export declare function computeS(rScalar: Uint8Array, sk: Uint8Array, c: string): string;
/**
 * Computes and returns the Plume and other signals for the prover.
 * @param {string | Uint8Array} message - Message to sign, in either string or UTF-8 array format.
 * @param {string | Uint8Array} sk - ECDSA secret key to sign with.
 * @param {string| Uint8Array} rScalar - Optional seed for randomness.
 * @returns Object containing Plume and other signals - public key, s, c, gPowR, and hashMPKPowR.
 */
export declare function computeAllInputs(message: string | Uint8Array, sk: string | Uint8Array, rScalar?: string | Uint8Array, version?: PlumeVersion): Promise<{
    nullifier: Point;
    s: string;
    pk: Uint8Array<ArrayBufferLike>;
    c: any;
    rPoint: Point;
    hashedToCurveR: Point;
}>;
//# sourceMappingURL=signals.d.ts.map