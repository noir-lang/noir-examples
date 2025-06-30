"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeBufferable = exports.deserializeArrayFromVector = exports.serializeBufferArrayToVector = exports.deserializeField = exports.deserializeInt32 = exports.deserializeUInt32 = exports.deserializeBool = exports.deserializeBufferFromVector = exports.serializeDate = exports.deserializeBigInt = exports.serializeBigInt = exports.serializeBufferToVector = exports.uint8ArrayToHexString = exports.concatenateUint8Arrays = exports.numToUInt8 = exports.numToInt32BE = exports.numToUInt32BE = exports.numToUInt32LE = exports.boolToBuffer = void 0;
const raw_buffer_js_1 = require("../types/raw_buffer.js");
// For serializing bool.
function boolToBuffer(b) {
    const buf = new Uint8Array(1);
    buf[0] = b ? 1 : 0;
    return buf;
}
exports.boolToBuffer = boolToBuffer;
// For serializing numbers to 32 bit little-endian form.
function numToUInt32LE(n, bufferSize = 4) {
    const buf = new Uint8Array(bufferSize);
    new DataView(buf.buffer).setUint32(buf.byteLength - 4, n, true);
    return buf;
}
exports.numToUInt32LE = numToUInt32LE;
// For serializing numbers to 32 bit big-endian form.
function numToUInt32BE(n, bufferSize = 4) {
    const buf = new Uint8Array(bufferSize);
    new DataView(buf.buffer).setUint32(buf.byteLength - 4, n, false);
    return buf;
}
exports.numToUInt32BE = numToUInt32BE;
// For serializing signed numbers to 32 bit big-endian form.
function numToInt32BE(n, bufferSize = 4) {
    const buf = new Uint8Array(bufferSize);
    new DataView(buf.buffer).setInt32(buf.byteLength - 4, n, false);
    return buf;
}
exports.numToInt32BE = numToInt32BE;
// For serializing numbers to 8 bit form.
function numToUInt8(n) {
    const buf = new Uint8Array(1);
    buf[0] = n;
    return buf;
}
exports.numToUInt8 = numToUInt8;
function concatenateUint8Arrays(arrayOfUint8Arrays) {
    const totalLength = arrayOfUint8Arrays.reduce((prev, curr) => prev + curr.length, 0);
    const result = new Uint8Array(totalLength);
    let length = 0;
    for (const array of arrayOfUint8Arrays) {
        result.set(array, length);
        length += array.length;
    }
    return result;
}
exports.concatenateUint8Arrays = concatenateUint8Arrays;
function uint8ArrayToHexString(uint8Array) {
    return uint8Array.reduce((accumulator, byte) => accumulator + byte.toString(16).padStart(2, '0'), '');
}
exports.uint8ArrayToHexString = uint8ArrayToHexString;
// For serializing a buffer as a vector.
function serializeBufferToVector(buf) {
    return concatenateUint8Arrays([numToInt32BE(buf.length), buf]);
}
exports.serializeBufferToVector = serializeBufferToVector;
function serializeBigInt(n, width = 32) {
    const buf = new Uint8Array(width);
    for (let i = 0; i < width; i++) {
        buf[width - i - 1] = Number((n >> BigInt(i * 8)) & 0xffn);
    }
    return buf;
}
exports.serializeBigInt = serializeBigInt;
function deserializeBigInt(buf, offset = 0, width = 32) {
    let result = 0n;
    for (let i = 0; i < width; i++) {
        result = (result << BigInt(8)) | BigInt(buf[offset + i]);
    }
    return { elem: result, adv: width };
}
exports.deserializeBigInt = deserializeBigInt;
function serializeDate(date) {
    return serializeBigInt(BigInt(date.getTime()), 8);
}
exports.serializeDate = serializeDate;
function deserializeBufferFromVector(vector, offset = 0) {
    const length = new DataView(vector.buffer, vector.byteOffset + offset, 4).getUint32(0, false);
    const adv = 4 + length;
    const elem = vector.slice(offset + 4, offset + adv);
    return { elem, adv };
}
exports.deserializeBufferFromVector = deserializeBufferFromVector;
function deserializeBool(buf, offset = 0) {
    const adv = 1;
    const elem = buf[offset] !== 0;
    return { elem, adv };
}
exports.deserializeBool = deserializeBool;
function deserializeUInt32(buf, offset = 0) {
    const adv = 4;
    const elem = new DataView(buf.buffer, buf.byteOffset + offset, adv).getUint32(0, false);
    return { elem, adv };
}
exports.deserializeUInt32 = deserializeUInt32;
function deserializeInt32(buf, offset = 0) {
    const adv = 4;
    const elem = new DataView(buf.buffer, buf.byteOffset + offset, adv).getInt32(0, false);
    return { elem, adv };
}
exports.deserializeInt32 = deserializeInt32;
function deserializeField(buf, offset = 0) {
    const adv = 32;
    const elem = buf.slice(offset, offset + adv);
    return { elem, adv };
}
exports.deserializeField = deserializeField;
// For serializing an array of fixed length elements.
function serializeBufferArrayToVector(arr) {
    return concatenateUint8Arrays([numToUInt32BE(arr.length), ...arr.flat()]);
}
exports.serializeBufferArrayToVector = serializeBufferArrayToVector;
function deserializeArrayFromVector(deserialize, vector, offset = 0) {
    let pos = offset;
    const size = new DataView(vector.buffer, vector.byteOffset + pos, 4).getUint32(0, false);
    pos += 4;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
        const { elem, adv } = deserialize(vector, pos);
        pos += adv;
        arr[i] = elem;
    }
    return { elem: arr, adv: pos - offset };
}
exports.deserializeArrayFromVector = deserializeArrayFromVector;
/**
 * Serializes a list of objects contiguously for calling into wasm.
 * @param objs - Objects to serialize.
 * @returns A buffer list with the concatenation of all fields.
 */
function serializeBufferable(obj) {
    if (Array.isArray(obj)) {
        return serializeBufferArrayToVector(obj.map(serializeBufferable));
    }
    else if (obj instanceof raw_buffer_js_1.RawBuffer) {
        return obj;
    }
    else if (obj instanceof Uint8Array) {
        return serializeBufferToVector(obj);
    }
    else if (typeof obj === 'boolean') {
        return boolToBuffer(obj);
    }
    else if (typeof obj === 'number') {
        return numToUInt32BE(obj);
    }
    else if (typeof obj === 'bigint') {
        return serializeBigInt(obj);
    }
    else if (typeof obj === 'string') {
        return serializeBufferToVector(new TextEncoder().encode(obj));
    }
    else {
        return obj.toBuffer();
    }
}
exports.serializeBufferable = serializeBufferable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcmlhbGl6ZS9zZXJpYWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQW1EO0FBRW5ELHdCQUF3QjtBQUN4QixTQUFnQixZQUFZLENBQUMsQ0FBVTtJQUNyQyxNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFKRCxvQ0FJQztBQUVELHdEQUF3RDtBQUN4RCxTQUFnQixhQUFhLENBQUMsQ0FBUyxFQUFFLFVBQVUsR0FBRyxDQUFDO0lBQ3JELE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUpELHNDQUlDO0FBRUQscURBQXFEO0FBQ3JELFNBQWdCLGFBQWEsQ0FBQyxDQUFTLEVBQUUsVUFBVSxHQUFHLENBQUM7SUFDckQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakUsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBSkQsc0NBSUM7QUFFRCw0REFBNEQ7QUFDNUQsU0FB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