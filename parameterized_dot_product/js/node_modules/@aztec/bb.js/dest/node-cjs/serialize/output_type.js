"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringDeserializer = exports.BufferDeserializer = exports.VectorDeserializer = exports.NumberDeserializer = exports.BoolDeserializer = void 0;
const buffer_reader_js_1 = require("./buffer_reader.js");
function BoolDeserializer() {
    return {
        SIZE_IN_BYTES: 1,
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readBoolean();
        },
    };
}
exports.BoolDeserializer = BoolDeserializer;
function NumberDeserializer() {
    return {
        SIZE_IN_BYTES: 4,
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readNumber();
        },
    };
}
exports.NumberDeserializer = NumberDeserializer;
function VectorDeserializer(t) {
    return {
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readVector(t);
        },
    };
}
exports.VectorDeserializer = VectorDeserializer;
function BufferDeserializer() {
    return {
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readBuffer();
        },
    };
}
exports.BufferDeserializer = BufferDeserializer;
function StringDeserializer() {
    return {
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readString();
        },
    };
}
exports.StringDeserializer = StringDeserializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X3R5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VyaWFsaXplL291dHB1dF90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUFrRDtBQU9sRCxTQUFnQixnQkFBZ0I7SUFDOUIsT0FBTztRQUNMLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLFVBQVUsRUFBRSxDQUFDLEdBQThCLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE1BQU0sR0FBRywrQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFSRCw0Q0FRQztBQUVELFNBQWdCLGtCQUFrQjtJQUNoQyxPQUFPO1FBQ0wsYUFBYSxFQUFFLENBQUM7UUFDaEIsVUFBVSxFQUFFLENBQUMsR0FBOEIsRUFBRSxFQUFFO1lBQzdDLE1BQU0sTUFBTSxHQUFHLCtCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQVJELGdEQVFDO0FBRUQsU0FBZ0Isa0JBQWtCLENBQUksQ0FBZ0I7SUFDcEQsT0FBTztRQUNMLFVBQVUsRUFBRSxDQUFDLEdBQThCLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE1BQU0sR0FBRywrQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBUEQsZ0RBT0M7QUFFRCxTQUFnQixrQkFBa0I7SUFDaEMsT0FBTztRQUNMLFVBQVUsRUFBRSxDQUFDLEdBQThCLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE1BQU0sR0FBRywrQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFQRCxnREFPQztBQUVELFNBQWdCLGtCQUFrQjtJQUNoQyxPQUFPO1FBQ0wsVUFBVSxFQUFFLENBQUMsR0FBOEIsRUFBRSxFQUFFO1lBQzdDLE1BQU0sTUFBTSxHQUFHLCtCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQVBELGdEQU9DIn0=