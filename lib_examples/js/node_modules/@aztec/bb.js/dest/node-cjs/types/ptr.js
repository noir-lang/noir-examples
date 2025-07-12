"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ptr = void 0;
const index_js_1 = require("../serialize/index.js");
/**
 * Holds an opaque pointer into WASM memory.
 * Currently only 4 bytes, but could grow to 8 bytes with wasm64.
 */
class Ptr {
    constructor(value) {
        this.value = value;
    }
    static fromBuffer(buffer) {
        const reader = index_js_1.BufferReader.asReader(buffer);
        return new this(reader.readBytes(this.SIZE_IN_BYTES));
    }
    toBuffer() {
        return this.value;
    }
}
exports.Ptr = Ptr;
Ptr.SIZE_IN_BYTES = 4;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHRyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3R5cGVzL3B0ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBcUQ7QUFFckQ7OztHQUdHO0FBQ0gsTUFBYSxHQUFHO0lBR2QsWUFBNEIsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtJQUFHLENBQUM7SUFFakQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7QUFaSCxrQkFhQztBQVpRLGlCQUFhLEdBQUcsQ0FBQyxDQUFDIn0=