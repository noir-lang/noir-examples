fn main(input: Field, threshold: pub Field, flag: pub Field) {
    let input_u32 = input as u32;
    let threshold_u32 = threshold as u32;
    let is_valid = if input_u32 >= threshold_u32 { 1 } else { 0 };
    assert(is_valid == flag);
}

#[test]
fn test_input_meets_threshold() {
    let input = 21;
    let threshold = 18;
    let flag = 1; // Should pass: 21 >= 18
    let is_valid = if input >= threshold { 1 } else { 0 };
    assert(is_valid == flag);
}

#[test]
fn test_input_below_threshold() {
    let input = 16;
    let threshold = 18;
    let flag = 0; // Should pass: 16 < 18
    let is_valid = if input >= threshold { 1 } else { 0 };
    assert(is_valid == flag);
}

// Optional failing test for demonstration purposes:
// #[test]
// fn test_invalid_flag() {
//     let input = 17;
//     let threshold = 18;
//     let flag = 1; // Incorrect: should be 0
//     let is_valid = if input >= threshold { 1 } else { 0 };
//     assert(is_valid == flag); // This will fail
// }

