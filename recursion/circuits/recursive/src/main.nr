use bb_proof_verification::{UltraHonkProof, UltraHonkVerificationKey, verify_honk_proof_non_zk};
fn main(
    verification_key: UltraHonkVerificationKey,
    proof: UltraHonkProof,
    public_inputs: pub [Field; 1],
    key_hash: Field,
) {
    verify_honk_proof_non_zk(verification_key, proof, public_inputs, key_hash);
}
