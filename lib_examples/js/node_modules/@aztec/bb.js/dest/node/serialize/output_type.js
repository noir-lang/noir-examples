import { BufferReader } from './buffer_reader.js';
export function BoolDeserializer() {
    return {
        SIZE_IN_BYTES: 1,
        fromBuffer: (buf) => {
            const reader = BufferReader.asReader(buf);
            return reader.readBoolean();
        },
    };
}
export function NumberDeserializer() {
    return {
        SIZE_IN_BYTES: 4,
        fromBuffer: (buf) => {
            const reader = BufferReader.asReader(buf);
            return reader.readNumber();
        },
    };
}
export function VectorDeserializer(t) {
    return {
        fromBuffer: (buf) => {
            const reader = BufferReader.asReader(buf);
            return reader.readVector(t);
        },
    };
}
export function BufferDeserializer() {
    return {
        fromBuffer: (buf) => {
            const reader = BufferReader.asReader(buf);
            return reader.readBuffer();
        },
    };
}
export function StringDeserializer() {
    return {
        fromBuffer: (buf) => {
            const reader = BufferReader.asReader(buf);
            return reader.readString();
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X3R5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VyaWFsaXplL291dHB1dF90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQU9sRCxNQUFNLFVBQVUsZ0JBQWdCO0lBQzlCLE9BQU87UUFDTCxhQUFhLEVBQUUsQ0FBQztRQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUE4QixFQUFFLEVBQUU7WUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLE9BQU87UUFDTCxhQUFhLEVBQUUsQ0FBQztRQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUE4QixFQUFFLEVBQUU7WUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCLENBQUksQ0FBZ0I7SUFDcEQsT0FBTztRQUNMLFVBQVUsRUFBRSxDQUFDLEdBQThCLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLE9BQU87UUFDTCxVQUFVLEVBQUUsQ0FBQyxHQUE4QixFQUFFLEVBQUU7WUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLE9BQU87UUFDTCxVQUFVLEVBQUUsQ0FBQyxHQUE4QixFQUFFLEVBQUU7WUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==