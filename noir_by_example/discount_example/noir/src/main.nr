// Apply a 10% discount if the user is eligible
fn get_discount(price: Field, eligible: bool) -> Field {
    if eligible {
        price * 90 / 100  // 10% discount
    } else {
        price
    }
}

// Entry point with public inputs and output
fn main(price: pub Field, eligible: pub bool) -> pub Field {
    get_discount(price, eligible)
}

#[test]
fn test_discount_applies() {
    let result = main(100, true);
    assert(result == 90);
}

#[test]
fn test_no_discount() {
    let result = main(100, false);
    assert(result == 100);
}
