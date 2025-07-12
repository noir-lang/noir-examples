use noir_base64_lib::encode::base64_encode;
use noir_base64_lib::decode::base64_decode;

/// Noir Base64 Encode/Decode Circuit
/// - If `do_encode` is true, encodes the first 12 bytes of `input` as base64.
///   - Asserts unused bytes (input[12..16]) are zero for safety.
/// - If `do_encode` is false, decodes all 16 bytes of `input` as base64.
///   - Invalid base64 input aborts the circuit (library asserts).
///   - Output is zero-padded to 16 bytes.
/// - Output: 
///   - [u8; 16]: Encoded or decoded result (decoded is zero-padded).
/// - All inputs are private; output is public.
/// 
fn main(input: [u8; 16], do_encode: bool) -> pub [u8; 16] {
    if do_encode {
        // Validate unused input bytes are zero
        for i in 12..16 {
            assert(input[i] == 0, "Unused input bytes for encoding must be zero");
        }
        let mut short_input: [u8; 12] = [0; 12];
        for i in 0..12 {
            short_input[i] = input[i];
        }
        base64_encode(short_input)
    } else {
        let decoded: [u8; 12] = base64_decode(input);    // Will abort on invalid base64
        let mut output: [u8; 16] = [0; 16];
        for i in 0..12 {
            output[i] = decoded[i];
        }
        output
    }
}

#[test]
fn test_encode() {
    let input: [u8; 16] = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0];
    let expected: [u8; 16] = [83, 71, 86, 115, 98, 71, 56, 103, 86, 50, 57, 121, 98, 71, 81, 104];
    let encoded = main(input, true);
    assert(encoded == expected, "Encoding failed");
}

#[test]
fn test_decode() {
    let encoded: [u8; 16] = [83, 71, 86, 115, 98, 71, 56, 103, 86, 50, 57, 121, 98, 71, 81, 104];
    let expected: [u8; 12] = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33];
    let decoded_padded = main(encoded, false);
    for i in 0..12 {
        assert(decoded_padded[i] == expected[i], "Decoding failed");
    }
}

#[test(should_fail)]
fn test_invalid_encode_input() {
    // Last 4 bytes non-zero should fail encoding
    let input: [u8; 16] = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 1, 2, 3, 4];
    let _ = main(input, true);
}

#[test(should_fail_with = "DecodeError")]
fn test_invalid_base64_decode() {
    let bad_base64: [u8; 16] = [0; 16]; // invalid base64, triggers library assertion
    let _ = main(bad_base64, false);
}