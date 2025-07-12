"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBytes = void 0;
const randomBytes = (len) => {
    const getWebCrypto = () => {
        if (typeof window !== 'undefined' && window.crypto)
            return window.crypto;
        if (typeof globalThis !== 'undefined' && globalThis.crypto)
            return globalThis.crypto;
        return undefined;
    };
    const crypto = getWebCrypto();
    if (!crypto) {
        throw new Error('randomBytes UnsupportedEnvironment');
    }
    const buf = new Uint8Array(len);
    // limit of Crypto.getRandomValues()
    // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
    const MAX_BYTES = 65536;
    if (len > MAX_BYTES) {
        // this is the max bytes crypto.getRandomValues
        // can do at once see https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
        for (let generated = 0; generated < len; generated += MAX_BYTES) {
            // buffer.slice automatically checks if the end is past the end of
            // the buffer so we don't have to here
            crypto.getRandomValues(buf.subarray(generated, generated + MAX_BYTES));
        }
    }
    else {
        crypto.getRandomValues(buf);
    }
    return buf;
};
exports.randomBytes = randomBytes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcmFuZG9tL2Jyb3dzZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtJQUN6QyxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7UUFDeEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLE1BQU07WUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDekUsSUFBSSxPQUFPLFVBQVUsS0FBSyxXQUFXLElBQUksVUFBVSxDQUFDLE1BQU07WUFBRSxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDckYsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVoQyxvQ0FBb0M7SUFDcEMsMEVBQTBFO0lBQzFFLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQztJQUV4QixJQUFJLEdBQUcsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUNwQiwrQ0FBK0M7UUFDL0Msb0dBQW9HO1FBQ3BHLEtBQUssSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxHQUFHLEVBQUUsU0FBUyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2hFLGtFQUFrRTtZQUNsRSxzQ0FBc0M7WUFDdEMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDO0lBQ0gsQ0FBQztTQUFNLENBQUM7UUFDTixNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQztBQS9CVyxRQUFBLFdBQVcsZUErQnRCIn0=