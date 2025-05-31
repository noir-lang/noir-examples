fn main(age: u32) {
    let min_age: u32 = 18;
    let max_age: u32 = 60;

    assert(age >= min_age, "Too young");
    assert(age <= max_age, "Too old");
}

#[test]
fn test_valid_age() {
    main(35); // Should pass
}
//#[test]
//#[should_fail]
//fn test_age_too_low() {
 //   main(16); // Should fail
//}

//#[test]
//#[should_fail]
//fn test_age_too_high() {
//    main(75); // Should fail
//}         
