use noir_bignum::BLS12_381_Fr;
mod test_inputs;
fn main(
    a: BLS12_381_Fr,
    b: BLS12_381_Fr,
    sum: pub BLS12_381_Fr,
    diff: pub BLS12_381_Fr,
    prod: pub BLS12_381_Fr,
    quot: pub BLS12_381_Fr
) {
    let s = a + b;
    assert(s == sum);

    let d = a - b;
    assert(d == diff);

    let p = a * b;
    assert(p == prod);

    let q = a / b; // Safe because this is a field element, not a generic integer
    assert(q == quot);
}
