
fn main(x: Field, y: pub Field) {
    let res = x * 2 + y;
    assert(res == 9);
}
#[test]
fn test_correct_inputs() {
    let x = 3;
    let y = 3;
    let res = x * 2 + y;
    assert(res == 9); // (3 * 2) + 3 = 9
}

//#[test]
//fn test_incorrect_inputs() {
  //  let x = 2;
    //let y = 3;
    //let res = x * 2 + y;
    //assert(res == 9); // (2 * 2) + 3 = 7 Fails if uncommented.
//}

#[test]
fn test_zero_input_edge_case() {
    let x = 0;
    let y = 9;
    let res = x * 2 + y;
    assert(res == 9); // 0 * 2 + 9 = 9 
}
