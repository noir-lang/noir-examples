use noir_bignum::BLS12_381_Fr;
use noir_bignum::BigNum;

#[test]
fn test_main_operations() {
    let a = BLS12_381_Fr::from_limbs([1044310035054858957612726961074801362, 928, 0]);
    let b = BLS12_381_Fr::from_limbs([37920230572938542347897422691634353, 743, 0]);
    let expected_sum = BLS12_381_Fr::from_limbs([1082230265627797499960624383766435715, 1671, 0]);
    let expected_diff = BLS12_381_Fr::from_limbs([1006389804481920415264829538383167009, 185, 0]);
    let expected_prod = BLS12_381_Fr::from_limbs([722508833652039018476432425978581787, 269057426587538885216493448730592551, 7528]);
    let expected_quot = BLS12_381_Fr::from_limbs([758371683859110429798045578386211010, 1026866925532269988183254321283787192, 21585]);

    let sum = a + b;
    let diff = a - b;
    let prod = a * b;
    let quot = a / b;

    assert(sum == expected_sum);
    assert(diff == expected_diff);
    assert(prod == expected_prod);
    assert(quot == expected_quot);
}
#[test]
fn test_limb_operations() {
    let a = BLS12_381_Fr::from_limbs([487086254354070180901859620449880791, 1929, 0]);
    let b = BLS12_381_Fr::from_limbs([218815252673421056031135407731575989, 511, 0]);
    let expected_sum = BLS12_381_Fr::from_limbs([705901507027491236932995028181456780, 2440, 0]);
    let expected_diff = BLS12_381_Fr::from_limbs([268271001680649124870724212718304802, 1418, 0]);
    let expected_prod = BLS12_381_Fr::from_limbs([225391365408465383255691609360416226, 388349417444420972164054175440788909, 6861]);
    let expected_quot = BLS12_381_Fr::from_limbs([1225190975443171941852808232966175976, 1076350538599756314149523017321495464, 8449]);

    let sum = a + b;
    let diff = a - b;
    let prod = a * b;
    let quot = a / b;

    assert(sum == expected_sum);
    assert(diff == expected_diff);
    assert(prod == expected_prod);
    assert(quot == expected_quot);
}
#[test(should_fail)]
fn test_limb_operations_should_fail() {
    let a = BLS12_381_Fr::from_limbs([487086254354070180901859620449880791, 1929, 0]);
    let b = BLS12_381_Fr::from_limbs([218815252673421056031135407731575989, 511, 0]);
    // Intentionally modified expected values (added 1 to each limb)
    let expected_sum = BLS12_381_Fr::from_limbs([705901507027491236932995028181456781, 2441, 1]);
    let expected_diff = BLS12_381_Fr::from_limbs([268271001680649124870724212718304803, 1419, 1]);
    let expected_prod = BLS12_381_Fr::from_limbs([225391365408465383255691609360416227, 388349417444420972164054175440788910, 6862]);
    let expected_quot = BLS12_381_Fr::from_limbs([1225190975443171941852808232966175977, 1076350538599756314149523017321495465, 8450]);

    let sum = a + b;
    let diff = a - b;
    let prod = a * b;
    let quot = a / b;

    assert(sum == expected_sum);
    assert(diff == expected_diff);
    assert(prod == expected_prod);
    assert(quot == expected_quot);
}