use ecrecover::secp256k1::PubKey;
use noir_bigcurve::scalar_field::{ScalarField, ScalarFieldTrait};
use noir_bigcurve::curves::secp256k1::{Secp256k1, Secp256k1_Fq, Secp256k1Scalar};
use plume::Plume;
use hash_to_curve::hash_to_curve; // <-- your local implementation!
use bignum::BigNum;
use nodash::poseidon2;
use trees::merkle::MerkleTree;
use trees::types::{MT_Creator, MembershipProver};

global DEPTH: u32 = 12;

fn hasher(leaves: [Field; 2]) -> Field {
    poseidon2(leaves)
}

fn main(
    pub_key_x: [u8; 32],
    pub_key_y: [u8; 32],
    message: pub [u8; 41],
    c: [u8; 32],
    s: [u8; 32],
    nullifier_x: pub [u8; 32],
    nullifier_y: pub [u8; 32],
    eligible_root: pub Field,
    eligible_path: [Field; DEPTH],
    eligible_index: Field,
    claimer_priv: Field,
) -> pub Field {
    let c_bn = Secp256k1_Fq::from_be_bytes(c);
    let scalar_c: Secp256k1Scalar = ScalarField::from_bignum(c_bn);

    let s_bn = Secp256k1_Fq::from_be_bytes(s);
    let scalar_s: Secp256k1Scalar = ScalarField::from_bignum(s_bn);

    let pubkey_bg = Secp256k1 {
        x: Secp256k1_Fq::from_be_bytes(pub_key_x),
        y: Secp256k1_Fq::from_be_bytes(pub_key_y),
        is_infinity: false,
    };

    let nullifier = Secp256k1 {
        x: Secp256k1_Fq::from_be_bytes(nullifier_x),
        y: Secp256k1_Fq::from_be_bytes(nullifier_y),
        is_infinity: false,
    };

    let plume = Plume::new(
        message,
        scalar_c,
        scalar_s,
        pubkey_bg,
        nullifier,
        hash_to_curve, // <-- this must be your local function!
    );

    let pubkey = PubKey::from_xy(pub_key_x, pub_key_y);
    let address = pubkey.to_eth_address();

    let mut mt: MerkleTree<Field> = MerkleTree::from(eligible_root, hasher);
    mt.membership(address, eligible_index, eligible_path);

    claimer_priv
}