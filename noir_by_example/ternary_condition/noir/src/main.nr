fn main(x: pub Field, y: pub Field, condition: pub bool) -> pub Field {
    if condition {
        x
    } else {
        y
    }
}

#[test]
fn test_select_x() {
    let result = main(10, 20, true);
    assert(result == 10);
}

#[test]
fn test_select_y() {
    let result = main(10, 20, false);
    assert(result == 20);
}
