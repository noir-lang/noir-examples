import { CURVE, getPublicKey, Point, utils } from '@noble/secp256k1';
import { concatUint8Arrays, hexToBigInt, hexToUint8Array, messageToUint8Array, uint8ArrayToBigInt, } from './utils/encoding.js';
import { multiplyPoint } from './utils/curve.js';
import { BarretenbergSync, Fr } from '@aztec/bb.js';
import { hashToCurve } from '@noble/curves/secp256k1';
// PLUME version
export var PlumeVersion;
(function (PlumeVersion) {
    PlumeVersion[PlumeVersion["V1"] = 1] = "V1";
    PlumeVersion[PlumeVersion["V2"] = 2] = "V2";
})(PlumeVersion || (PlumeVersion = {}));
export function computeHashToCurve(message, pk) {
    // Concatenate message and publicKey
    const preimage = new Uint8Array(message.length + pk.length);
    preimage.set(message);
    preimage.set(pk, message.length);
    const point = hashToCurve(preimage);
    const affinePoint = point.toAffine();
    return {
        x: affinePoint.x.toString(),
        y: affinePoint.y.toString(),
    };
}
export function computeC_V2(nullifier, rPoint, hashedToCurveR, hasher) {
    const nullifierBytes = nullifier.toRawBytes(true);
    const preimage = concatUint8Arrays([
        nullifierBytes,
        rPoint.toRawBytes(true),
        hashedToCurveR.toRawBytes(true),
    ]);
    return hasher(preimage);
}
export function computeC_V1(pkBytes, hashedToCurve, nullifier, rPoint, hashedToCurveR, hasher) {
    const nullifierBytes = nullifier.toRawBytes(true);
    const preimage = concatUint8Arrays([
        Point.BASE.toRawBytes(true),
        pkBytes,
        new Point(hexToBigInt(hashedToCurve.x.toString()), hexToBigInt(hashedToCurve.y.toString())).toRawBytes(true),
        nullifierBytes,
        rPoint.toRawBytes(true),
        hashedToCurveR.toRawBytes(true),
    ]);
    return hasher(preimage);
}
export function computeNullifer(hashedToCurve, sk) {
    return multiplyPoint(hashedToCurve, sk);
}
export function computeRPoint(rScalar) {
    return Point.fromPrivateKey(rScalar);
}
export function computeHashToCurveR(hashedToCurve, rScalar) {
    return multiplyPoint(hashedToCurve, rScalar);
}
export function computeS(rScalar, sk, c) {
    return ((((uint8ArrayToBigInt(sk) * hexToBigInt(c)) % CURVE.n) + uint8ArrayToBigInt(rScalar)) %
        CURVE.n).toString(16);
}
/**
 * Computes and returns the Plume and other signals for the prover.
 * @param {string | Uint8Array} message - Message to sign, in either string or UTF-8 array format.
 * @param {string | Uint8Array} sk - ECDSA secret key to sign with.
 * @param {string| Uint8Array} rScalar - Optional seed for randomness.
 * @returns Object containing Plume and other signals - public key, s, c, gPowR, and hashMPKPowR.
 */
export async function computeAllInputs(message, sk, rScalar, version = PlumeVersion.V2) {
    const bb = await BarretenbergSync.new();
    const hasher = (nodes) => bb
        .poseidon2Hash([Fr.fromBuffer(nodes)])
        .toString()
        .slice(2);
    const skBytes = typeof sk === 'string' ? hexToUint8Array(sk) : sk;
    const messageBytes = typeof message === 'string' ? messageToUint8Array(message) : message;
    const pkBytes = getPublicKey(skBytes, true);
    let rScalarBytes;
    if (rScalar) {
        rScalarBytes = typeof rScalar === 'string' ? hexToUint8Array(rScalar) : rScalar;
    }
    else {
        rScalarBytes = utils.randomPrivateKey();
    }
    const hashedToCurve = computeHashToCurve(messageBytes, pkBytes);
    const nullifier = computeNullifer(hashedToCurve, skBytes);
    const hashedToCurveR = computeHashToCurveR(hashedToCurve, rScalarBytes);
    const rPoint = computeRPoint(rScalarBytes);
    const c = version == PlumeVersion.V1
        ? computeC_V1(pkBytes, hashedToCurve, nullifier, rPoint, hashedToCurveR, hasher)
        : computeC_V2(nullifier, rPoint, hashedToCurveR, hasher);
    const s = computeS(rScalarBytes, skBytes, c);
    return {
        nullifier,
        s,
        pk: pkBytes,
        c,
        rPoint,
        hashedToCurveR,
    };
}
//# sourceMappingURL=signals.js.map