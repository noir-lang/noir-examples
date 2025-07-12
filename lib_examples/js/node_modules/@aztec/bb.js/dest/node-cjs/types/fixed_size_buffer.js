"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buffer128 = exports.Buffer64 = exports.Buffer32 = void 0;
const index_js_1 = require("../random/index.js");
const index_js_2 = require("../serialize/index.js");
class Buffer32 {
    constructor(buffer) {
        this.buffer = buffer;
    }
    static fromBuffer(buffer) {
        const reader = index_js_2.BufferReader.asReader(buffer);
        return new Buffer32(reader.readBytes(this.SIZE_IN_BYTES));
    }
    static random() {
        return new Buffer32((0, index_js_1.randomBytes)(this.SIZE_IN_BYTES));
    }
    toBuffer() {
        return this.buffer;
    }
}
exports.Buffer32 = Buffer32;
Buffer32.SIZE_IN_BYTES = 32;
class Buffer64 {
    constructor(buffer) {
        this.buffer = buffer;
    }
    static fromBuffer(buffer) {
        const reader = index_js_2.BufferReader.asReader(buffer);
        return new Buffer64(reader.readBytes(this.SIZE_IN_BYTES));
    }
    static random() {
        return new Buffer64((0, index_js_1.randomBytes)(this.SIZE_IN_BYTES));
    }
    toBuffer() {
        return this.buffer;
    }
}
exports.Buffer64 = Buffer64;
Buffer64.SIZE_IN_BYTES = 64;
class Buffer128 {
    constructor(buffer) {
        this.buffer = buffer;
    }
    static fromBuffer(buffer) {
        const reader = index_js_2.BufferReader.asReader(buffer);
        return new Buffer128(reader.readBytes(this.SIZE_IN_BYTES));
    }
    static random() {
        return new Buffer128((0, index_js_1.randomBytes)(this.SIZE_IN_BYTES));
    }
    toBuffer() {
        return this.buffer;
    }
}
exports.Buffer128 = Buffer128;
Buffer128.SIZE_IN_BYTES = 128;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4ZWRfc2l6ZV9idWZmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHlwZXMvZml4ZWRfc2l6ZV9idWZmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaURBQWlEO0FBQ2pELG9EQUFxRDtBQUVyRCxNQUFhLFFBQVE7SUFHbkIsWUFBNEIsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFbEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFBLHNCQUFXLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7QUFoQkgsNEJBaUJDO0FBaEJRLHNCQUFhLEdBQUcsRUFBRSxDQUFDO0FBa0I1QixNQUFhLFFBQVE7SUFHbkIsWUFBNEIsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFbEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFBLHNCQUFXLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7QUFoQkgsNEJBaUJDO0FBaEJRLHNCQUFhLEdBQUcsRUFBRSxDQUFDO0FBa0I1QixNQUFhLFNBQVM7SUFHcEIsWUFBNEIsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFbEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLFNBQVMsQ0FBQyxJQUFBLHNCQUFXLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7QUFoQkgsOEJBaUJDO0FBaEJRLHVCQUFhLEdBQUcsR0FBRyxDQUFDIn0=