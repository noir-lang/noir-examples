use noir_bigcurve::curves::secp256k1::Secp256k1;
use noir_bigcurve::curves::secp256k1::Secp256k1Scalar;
use noir_bigcurve::scalar_field::ScalarFieldTrait;
use noir_bigcurve::BigCurveTrait;
use bignum::{Secp256k1_Fq, Secp256k1_Fr, BigNum};

// No 'pub' on these
fn prove_discrete_log(
    g_x: Secp256k1_Fq,
    g_y: Secp256k1_Fq,
    k: Secp256k1_Fr,
    q_x: Secp256k1_Fq,
    q_y: Secp256k1_Fq,
) {
    let G = Secp256k1 { x: g_x, y: g_y, is_infinity: false };
    assert(!G.is_infinity);
    G.validate_on_curve();

    let Q = Secp256k1 { x: q_x, y: q_y, is_infinity: false };
    Q.validate_on_curve();

    let k_scalar: Secp256k1Scalar = Secp256k1Scalar::from_bignum(k);
    let computed_Q = G.mul(k_scalar);

    assert(computed_Q.x == q_x);
    assert(computed_Q.y == q_y);
}

// Only 'pub' in main for public inputs
pub fn main(
    g_x: pub Secp256k1_Fq,
    g_y: pub Secp256k1_Fq,
    k: Secp256k1_Fr,
    q_x: pub Secp256k1_Fq,
    q_y: pub Secp256k1_Fq,
) {
    prove_discrete_log(g_x, g_y, k, q_x, q_y);
}
// Example test: Prove knowledge of k such that Q = kG
#[test]
fn test_prove_discrete_log() {
    let g_x = Secp256k1_Fq::from_limbs([809934545436666192144300149831112600, 532189659306663695932703699144214274, 31166]);
    let g_y = Secp256k1_Fq::from_limbs([123079417438355278731207347528586424, 1134337383257087261818981465599813885, 18490]);

    // Secret scalar k (witness)
    let k = Secp256k1_Fr::from_limbs([2,0,0]);

    // Public Q = k * G
    let q_x = Secp256k1_Fq::from_limbs([620769414058672675662360539292540645, 662428720985405666719129047941306460, 50692]);
    let q_y = Secp256k1_Fq::from_limbs([1278327165322711450801813382677652778, 545163776316525295403132726738087671, 6881]);

    prove_discrete_log(g_x, g_y, k, q_x, q_y);
}

#[test(should_fail)]
fn test_prove_discrete_log_wrong_Q() {
    let g_x = Secp256k1_Fq::from_limbs([809934545436666192144300149831112600, 532189659306663695932703699144214274, 31166]);
    let g_y = Secp256k1_Fq::from_limbs([123079417438355278731207347528586424, 1134337383257087261818981465599813885, 18490]);

    let k = Secp256k1_Fr::from_limbs([2,0,0]);

    // Wrong Q
    let q_x = Secp256k1_Fq::from_limbs([258484535409603203050605737993582329, 716568843669635254349561846039718325, 63792]);
    let q_y = Secp256k1_Fq::from_limbs([3439865459799723184042666981123698, 638964607539318458049780617139410533, 14479]);

    prove_discrete_log(g_x, g_y, k, q_x, q_y);
}
#[test(should_fail)]
fn test_prove_discrete_log_wrong_point() {
    // Deliberately choose a point NOT on secp256k1
    let bad_x = Secp256k1_Fq::from_limbs([258484535409603203050605737993582330, 716568843669635254349561846039718325, 63792]);
    let bad_y = Secp256k1_Fq::from_limbs([3439865459799723184042666981123699, 638964607539318458049780617139410533, 14479]);
    let k = Secp256k1_Fr::from_limbs([2,0,0]);
    let q_x = Secp256k1_Fq::from_limbs([516969070819206406101211480282132933, 103909691554354635795316631799092074, 62049]);
    let q_y = Secp256k1_Fq::from_limbs([6879730919599446368085333962247398, 1277929215078636916099561234278821066, 28958]);

    prove_discrete_log(bad_x, bad_y, k, q_x, q_y);
}