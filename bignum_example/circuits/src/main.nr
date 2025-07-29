// Arithmetic Checker for BLS12-381 Field Elements
// Ensures correctness of sum, difference, product, and quotient.
// Suitable as a component in real-world applications with basic input validation.
//
// Inputs:
//   a, b      - Private BLS12_381_Fr field elements (witnesses)
//   sum       - Public: Expected a + b
//   diff      - Public: Expected a - b
//   prod      - Public: Expected a * b
//   quot      - Public: Expected a / b (b must not be zero)
//
// Output:
//   Asserts all arithmetic checks, fails with clear error if any mismatch.

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
    // Check b != 0 before division for clarity and safety
    let zero: BLS12_381_Fr = BLS12_381_Fr::from(0);
    assert(b != zero, "Divisor b must be nonzero for field division.");

    // Compute and assert field operations with error messages
    let s = a + b;
    assert(s == sum, "Sum assertion failed: a + b != sum");

    let d = a - b;
    assert(d == diff, "Difference assertion failed: a - b != diff");

    let p = a * b;
    assert(p == prod, "Product assertion failed: a * b != prod");

    let q = a / b;
    assert(q == quot, "Quotient assertion failed: a / b != quot");
}