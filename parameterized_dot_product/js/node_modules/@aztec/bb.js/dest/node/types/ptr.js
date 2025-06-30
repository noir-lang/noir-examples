import { BufferReader } from '../serialize/index.js';
/**
 * Holds an opaque pointer into WASM memory.
 * Currently only 4 bytes, but could grow to 8 bytes with wasm64.
 */
export class Ptr {
    constructor(value) {
        this.value = value;
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new this(reader.readBytes(this.SIZE_IN_BYTES));
    }
    toBuffer() {
        return this.value;
    }
}
Ptr.SIZE_IN_BYTES = 4;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHRyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3R5cGVzL3B0ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFckQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLEdBQUc7SUFHZCxZQUE0QixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO0lBQUcsQ0FBQztJQUVqRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQWlDO1FBQ2pELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7O0FBWE0saUJBQWEsR0FBRyxDQUFDLENBQUMifQ==