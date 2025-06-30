export const randomBytes = (len) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcmFuZG9tL2Jyb3dzZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUU7SUFDekMsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO1FBQ3hCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNO1lBQUUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3pFLElBQUksT0FBTyxVQUFVLEtBQUssV0FBVyxJQUFJLFVBQVUsQ0FBQyxNQUFNO1lBQUUsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3JGLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUMsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQzlCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFaEMsb0NBQW9DO0lBQ3BDLDBFQUEwRTtJQUMxRSxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFeEIsSUFBSSxHQUFHLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFDcEIsK0NBQStDO1FBQy9DLG9HQUFvRztRQUNwRyxLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRyxFQUFFLFNBQVMsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNoRSxrRUFBa0U7WUFDbEUsc0NBQXNDO1lBQ3RDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDekUsQ0FBQztJQUNILENBQUM7U0FBTSxDQUFDO1FBQ04sTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUMifQ==