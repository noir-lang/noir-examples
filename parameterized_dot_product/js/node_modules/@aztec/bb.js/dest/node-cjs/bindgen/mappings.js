"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDeserializer = exports.mapRustType = exports.mapType = void 0;
/* eslint-disable camelcase */
const typeMap = {
    in_ptr: 'Ptr',
    out_ptr: 'Ptr',
    'bb::fr::in_buf': 'Fr',
    'bb::fr::vec_in_buf': 'Fr[]',
    'fr::in_buf': 'Fr',
    'fr::out_buf': 'Fr',
    'fr::vec_in_buf': 'Fr[]',
    'fr::vec_out_buf': 'Fr[]',
    'fq::in_buf': 'Fq',
    'fq::out_buf': 'Fq',
    'fq::vec_in_buf': 'Fq[]',
    'fq::vec_out_buf': 'Fq[]',
    'const uint8_t *': 'Uint8Array',
    'uint8_t **': 'Uint8Array',
    in_str_buf: 'string',
    out_str_buf: 'string',
    in_buf32: 'Buffer32',
    out_buf32: 'Buffer32',
    'uint32_t *': 'number',
    'const uint32_t *': 'number',
    'affine_element::in_buf': 'Point',
    'affine_element::out_buf': 'Point',
    'const bool *': 'boolean',
    'bool *': 'boolean',
    'multisig::MultiSigPublicKey::vec_in_buf': 'Buffer128[]',
    'multisig::MultiSigPublicKey::out_buf': 'Buffer128',
    'multisig::RoundOnePublicOutput::vec_in_buf': 'Buffer128[]',
    'multisig::RoundOnePublicOutput::out_buf': 'Buffer128',
    'multisig::RoundOnePrivateOutput::in_buf': 'Buffer128',
    'multisig::RoundOnePrivateOutput::out_buf': 'Buffer128',
};
const deserializerMap = {
    out_ptr: 'Ptr',
    'fr::out_buf': 'Fr',
    'fr::vec_out_buf': 'VectorDeserializer(Fr)',
    'fq::out_buf': 'Fq',
    'fq::vec_out_buf': 'VectorDeserializer(Fq)',
    'uint8_t **': 'BufferDeserializer()',
    out_str_buf: 'StringDeserializer()',
    out_buf32: 'Buffer32',
    'uint32_t *': 'NumberDeserializer()',
    'affine_element::out_buf': 'Point',
    'bool *': 'BoolDeserializer()',
    'multisig::MultiSigPublicKey::out_buf': 'Buffer128',
    'multisig::RoundOnePublicOutput::out_buf': 'Buffer128',
    'multisig::RoundOnePrivateOutput::out_buf': 'Buffer128',
};
function mapType(type) {
    if (typeMap[type]) {
        return typeMap[type];
    }
    throw new Error(`Unknown type: ${type}`);
}
exports.mapType = mapType;
exports.mapRustType = mapType;
function mapDeserializer(type) {
    if (deserializerMap[type]) {
        return deserializerMap[type];
    }
    throw new Error(`Unknown deserializer for type: ${type}`);
}
exports.mapDeserializer = mapDeserializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluZGdlbi9tYXBwaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4QkFBOEI7QUFDOUIsTUFBTSxPQUFPLEdBQThCO0lBQ3pDLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLEtBQUs7SUFDZCxnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLG9CQUFvQixFQUFFLE1BQU07SUFDNUIsWUFBWSxFQUFFLElBQUk7SUFDbEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsZ0JBQWdCLEVBQUUsTUFBTTtJQUN4QixpQkFBaUIsRUFBRSxNQUFNO0lBQ3pCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGdCQUFnQixFQUFFLE1BQU07SUFDeEIsaUJBQWlCLEVBQUUsTUFBTTtJQUN6QixpQkFBaUIsRUFBRSxZQUFZO0lBQy9CLFlBQVksRUFBRSxZQUFZO0lBQzFCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFdBQVcsRUFBRSxRQUFRO0lBQ3JCLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLGtCQUFrQixFQUFFLFFBQVE7SUFDNUIsd0JBQXdCLEVBQUUsT0FBTztJQUNqQyx5QkFBeUIsRUFBRSxPQUFPO0lBQ2xDLGNBQWMsRUFBRSxTQUFTO0lBQ3pCLFFBQVEsRUFBRSxTQUFTO0lBQ25CLHlDQUF5QyxFQUFFLGFBQWE7SUFDeEQsc0NBQXNDLEVBQUUsV0FBVztJQUNuRCw0Q0FBNEMsRUFBRSxhQUFhO0lBQzNELHlDQUF5QyxFQUFFLFdBQVc7SUFDdEQseUNBQXlDLEVBQUUsV0FBVztJQUN0RCwwQ0FBMEMsRUFBRSxXQUFXO0NBQ3hELENBQUM7QUFFRixNQUFNLGVBQWUsR0FBOEI7SUFDakQsT0FBTyxFQUFFLEtBQUs7SUFDZCxhQUFhLEVBQUUsSUFBSTtJQUNuQixpQkFBaUIsRUFBRSx3QkFBd0I7SUFDM0MsYUFBYSxFQUFFLElBQUk7SUFDbkIsaUJBQWlCLEVBQUUsd0JBQXdCO0lBQzNDLFlBQVksRUFBRSxzQkFBc0I7SUFDcEMsV0FBVyxFQUFFLHNCQUFzQjtJQUNuQyxTQUFTLEVBQUUsVUFBVTtJQUNyQixZQUFZLEVBQUUsc0JBQXNCO0lBQ3BDLHlCQUF5QixFQUFFLE9BQU87SUFDbEMsUUFBUSxFQUFFLG9CQUFvQjtJQUM5QixzQ0FBc0MsRUFBRSxXQUFXO0lBQ25ELHlDQUF5QyxFQUFFLFdBQVc7SUFDdEQsMENBQTBDLEVBQUUsV0FBVztDQUN4RCxDQUFDO0FBRUYsU0FBZ0IsT0FBTyxDQUFDLElBQVk7SUFDbEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNsQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBTEQsMEJBS0M7QUFFWSxRQUFBLFdBQVcsR0FBRyxPQUFPLENBQUM7QUFFbkMsU0FBZ0IsZUFBZSxDQUFDLElBQVk7SUFDMUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMxQixPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBTEQsMENBS0MifQ==