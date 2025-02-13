import { Point } from '@noble/secp256k1';
import { uint8ArrayToHex } from './encoding.js';
export function multiplyPoint(h, secretKey) {
    const hashPoint = new Point(BigInt('0x' + h.x.toString()), BigInt('0x' + h.y.toString()));
    return hashPoint.multiply(BigInt('0x' + uint8ArrayToHex(secretKey)));
}
//# sourceMappingURL=curve.js.map