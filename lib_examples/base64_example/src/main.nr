mod test_inputs;
use base64::{BASE64_ENCODER, BASE64_DECODER};

// Choose number of encode and/or decode runs
pub global ENCODE_RUNS: u32 = 3;
pub global DECODE_RUNS: u32 = 0;

// Choose size, and use corresponding Prover.toml during execution
comptime global TEST_INPUT = test_inputs::TEST_INPUT_SHORT;
comptime global TEST_BASE64_ENCODED = test_inputs::TEST_BASE64_ENCODED_SHORT;

comptime global U: u32 = comptime { TEST_INPUT.as_bytes().len() };
comptime global B: u32 = comptime {
    let mut q = U / 3;
    let r = U - q * 3;
    if (r > 0) { q += 1; }; // round up since encoded base64 gets padded
    q * 4
};

fn main(input: str<U>, base64_encoded: str<B>) {
    for _ in 0..ENCODE_RUNS {
        let _encoded: [u8; B] = BASE64_ENCODER.encode(input.as_bytes());
    }
    for _ in 0..DECODE_RUNS {
        let _decoded: [u8; U] = BASE64_DECODER.decode(base64_encoded.as_bytes());
    }
}

#[test]
fn test() {
    main(TEST_INPUT, TEST_BASE64_ENCODED);
}
