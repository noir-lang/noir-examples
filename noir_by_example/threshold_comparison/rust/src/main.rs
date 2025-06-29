fn threshold_check(input: u32, threshold: u32, flag: u32) {
    let is_valid = if input >= threshold { 1 } else { 0 };
    assert_eq!(is_valid, flag);
}

fn main() {
    threshold_check(22, 18, 1);
}

#[test]
fn test_input_above_threshold() {
    threshold_check(30, 18, 1);
}

#[test]
fn test_input_below_threshold() {
    threshold_check(10, 18, 0);
}

