// This function verifies that x * 2 + y == expected.
// x is private, y and expected are public.
fn main(x: Field, y: pub Field, expected: pub Field) {
    let res = x * 2 + y;
    assert(res == expected);
}

#[test]
fn test_correct_values_case1() {let x = 3;
    let y = 3;
    let expected = 9;
    let res = x * 2 + y;
    assert(res == expected);}

    #[test]
fn test_correct_values_case2() {
    let x = 4;
    let y = 6;
    let expected = 14;
    let res = x * 2 + y;
    assert(res == expected); }

//#[test]
//fn test_incorrect_expected() {
  //  let x = 2;
   // let y = 1;
   // let expected = 9;
   // let res = x * 2 + y;
   // assert(res == expected); // This should fail if uncommented
//} 
