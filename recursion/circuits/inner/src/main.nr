
fn main(x: Field, y: pub Field) {
    let res = x * 2 + y;
    assert(res == 9);
}

// This test should pass: (3 * 2) + 3 = 9
#[test]
fn test_correct_inputs() {
    let x = 3;
    let y = 3;
    let res = x * 2 + y;
    assert(res == 9); // (3 * 2) + 3 = 9
}

// This test should fail: (2 * 2) + 4 = 8 != 9
#[test(should_fail)]
fn test_incorrect_inputs() {
    let x = 2;
    let y = 4;
    let res = x * 2 + y;
    assert(res == 9); // (2 * 2) + 4 = 8
}

