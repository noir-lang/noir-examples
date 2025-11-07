use bb_proof_verification::{UltraHonkZKProof, UltraHonkVerificationKey, verify_ultrahonkzk_proof};
fn main(
    verification_key: UltraHonkVerificationKey,
    proof: UltraHonkZKProof,
    public_inputs: pub [Field; 1],
    key_hash: Field,
) {
    verify_ultrahonkzk_proof(verification_key, proof, public_inputs, key_hash);
}
