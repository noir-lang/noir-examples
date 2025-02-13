import { Point } from '@noble/secp256k1';
export interface HashedPoint {
    x: {
        toString(): string;
    };
    y: {
        toString(): string;
    };
}
export declare function multiplyPoint(h: HashedPoint, secretKey: Uint8Array): Point;
//# sourceMappingURL=curve.d.ts.map