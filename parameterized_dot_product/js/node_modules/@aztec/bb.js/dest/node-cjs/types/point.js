"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const index_js_1 = require("./index.js");
const buffer_reader_js_1 = require("../serialize/buffer_reader.js");
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static random() {
        // TODO: This is not a point on the curve!
        return new Point(index_js_1.Fr.random(), index_js_1.Fr.random());
    }
    static fromBuffer(buffer) {
        const reader = buffer_reader_js_1.BufferReader.asReader(buffer);
        return new this(index_js_1.Fr.fromBuffer(reader), index_js_1.Fr.fromBuffer(reader));
    }
    static fromString(address) {
        return Point.fromBuffer(Buffer.from(address.replace(/^0x/i, ''), 'hex'));
    }
    toBuffer() {
        return Buffer.concat([this.x.toBuffer(), this.y.toBuffer()]);
    }
    toString() {
        return '0x' + this.toBuffer().toString('hex');
    }
    equals(rhs) {
        return this.x.equals(rhs.x) && this.y.equals(rhs.y);
    }
}
exports.Point = Point;
Point.SIZE_IN_BYTES = 64;
Point.EMPTY = new Point(index_js_1.Fr.ZERO, index_js_1.Fr.ZERO);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHlwZXMvcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQWdDO0FBQ2hDLG9FQUE2RDtBQUU3RCxNQUFhLEtBQUs7SUFJaEIsWUFBNEIsQ0FBSyxFQUFrQixDQUFLO1FBQTVCLE1BQUMsR0FBRCxDQUFDLENBQUk7UUFBa0IsTUFBQyxHQUFELENBQUMsQ0FBSTtJQUFHLENBQUM7SUFFNUQsTUFBTSxDQUFDLE1BQU07UUFDWCwwQ0FBMEM7UUFDMUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxhQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsYUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBaUM7UUFDakQsTUFBTSxNQUFNLEdBQUcsK0JBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFlO1FBQy9CLE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7QUE5Qkgsc0JBK0JDO0FBOUJRLG1CQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ25CLFdBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxhQUFFLENBQUMsSUFBSSxFQUFFLGFBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9