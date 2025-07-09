global HONK_VK_SIZE: u32 = 128;
global HONK_PROOF_SIZE: u32 = 456;
global HONK_IDENTIFIER: u32 = 1;

fn main(
    verification_key1: [Field; HONK_VK_SIZE],
    proof1: [Field; HONK_PROOF_SIZE],
    public_inputs1: pub [Field; 1],
    verification_key2: [Field; HONK_VK_SIZE],
    proof2: [Field; HONK_PROOF_SIZE],
    public_inputs2: pub [Field; 1],
) {
    std::verify_proof_with_type(
        verification_key1,
        proof1,
        public_inputs1,
        0x0,
        HONK_IDENTIFIER,
    );
    std::verify_proof_with_type(
        verification_key2,
        proof2,
        public_inputs2,
        0x0,
        HONK_IDENTIFIER,
    );
}
