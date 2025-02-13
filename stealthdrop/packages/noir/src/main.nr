use bignum::BigNum;
use ecrecover::secp256k1::PubKey;
use nodash::array::pack_bytes;
use noir_bigcurve::BigCurve;
use noir_bigcurve::curves::secp256k1::{Secp256k1, Secp256k1Fq, Secp256k1Scalar};
use noir_bigcurve::scalar_field::ScalarField;
use plume::plume_v2;
use std::hash::poseidon2::Poseidon2::hash;
use trees::merkle::MerkleTree;

global DEPTH: u32 = 12;
global SECP256k1_SCALAR_SLICES: u32 = 65;

fn hasher(leaves: [Field; 2]) -> Field {
    hash(leaves, 2)
}

fn main(
    pub_key_x: [u8; 32],
    pub_key_y: [u8; 32],
    message: pub [u8; 8], // signthis
    c: [u8; 32],
    s: [u8; 32],
    nullifier_x: pub [u8; 32],
    nullifier_y: pub [u8; 32],
    eligible_root: pub Field,
    eligible_path: [Field; DEPTH],
    eligible_index: Field,
    claimer_priv: Field
) -> pub Field {

    let c_bn = Secp256k1Fq::from_be_bytes(c);
    let scalar_c: Secp256k1Scalar = ScalarField::from_bignum(c_bn);

    let s_bn = Secp256k1Fq::from_be_bytes(s);
    let scalar_s: Secp256k1Scalar = ScalarField::from_bignum(s_bn);

    let pubkey_bg = Secp256k1 {
        x: Secp256k1Fq::from_be_bytes(pub_key_x),
        y: Secp256k1Fq::from_be_bytes(pub_key_y),
        is_infinity: false,
    };

    let nullifier = Secp256k1 {
        x: Secp256k1Fq::from_be_bytes(nullifier_x),
        y: Secp256k1Fq::from_be_bytes(nullifier_y),
        is_infinity: false,
    };
    
    plume_v2(message, scalar_c, scalar_s, pubkey_bg, nullifier);

    let pubkey = PubKey::from_xy(pub_key_x, pub_key_y);
    let address = pubkey.to_eth_address();

    let mut mt = MerkleTree::from(eligible_root, hasher);
    mt.membership(address, eligible_index, eligible_path);

    // returning the claimer as a public input asserts it against the private input
    claimer_priv
}

// fn main(
//     pub_key: [u8; 64],
//     signature: [u8; 64],
//     hashed_message: pub [u8; 32],
//     nullifier: pub Field,
//     merkle_path: [Field; DEPTH],
//     index: Field,
//     merkle_root: pub Field,
//     claimer_priv: Field,
//     claimer_pub: pub Field,
// ) {
//     let mut mt = MerkleTree::from(merkle_root, hasher);

//     let key = ecrecover::secp256k1::PubKey::from_unified(pub_key);
//     let address = ecrecover::ecrecover(key.pub_x, key.pub_y, signature, hashed_message);

//     let signature_as_fields = signature.map(|x: u8| x as Field);
//     let calculatedNullifier = hash(signature_as_fields, 64);
//     assert(calculatedNullifier == nullifier);

//     mt.membership(address, index, merkle_path);

//     assert(claimer_priv == claimer_pub);
// }

// #[test]
// fn test_main() {
//     let pub_key = [
//         131,  24,  83,  91,  84,  16, 93,  74, 122, 174,  96,
//         192, 143, 196,  95, 150, 135, 24,  27,  79, 223, 198,
//         37, 189,  26, 117,  63, 167, 57, 127, 237, 117,  53,
//         71, 241,  28, 168, 105, 102, 70, 242, 243, 172, 176,
//         142,  49,   1, 106, 250, 194, 62,  99,  12,  93,  17,
//         245, 159,  97, 254, 245, 123, 13,  42, 165
//     ];
//     let signature = [
//         1,  83,  82, 167, 184,  77, 226, 104,   5,  27, 151,
//         91, 202, 127,  17, 183,  75,  31, 190, 253, 159, 116,
//         155,  13,  24, 178,  40, 165, 129,  90, 103, 204,  42,
//         164, 230,  62,  73, 181, 169,  61, 251, 221, 128, 221,
//         14,  19, 179,  25, 107, 132,  10, 188, 149,   0, 197,
//         52, 151, 239, 244, 103, 215, 224,  56, 242
//     ];
//     let hashed_message = [
//         3,  57, 199, 96, 145,  58, 183, 241,
//         206, 140,  36, 34, 165, 163,  17, 210,
//         97, 254, 154, 79,  91, 223, 149,  18,
//         3, 210, 111, 56, 246, 219,  19, 104
//     ];

//     let nullifier = 0x0e860d099661305414f1218fd4ba4ea3f71ef33123a6263cae21bf132ff8dac1;
//     let merkle_path = [
//         0x00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8,
//         0x0d76959f68406fde33752accbb712a425e9dc101b1ea4db5e3f9f9d0fb8bcd6e,
//         0x20476c92bde69215bc26b1c58e4871eeb662e03c426767e4c603d9df7ecf630f,
//         0x1306d71bfd84cac61cdfc548510f1877a9b00270355ba593aa85b24696efcb1e
//     ];
//     let index = 0;
//     let merkle_root = 0x0495e2611f40a6533787dd22f7f6ac85ed0d30511da78935fe940334bb73cc7d;
//     let claimer = 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc;

//     main(pub_key, signature, hashed_message, nullifier, merkle_path, index, merkle_root, claimer, claimer);
// }
