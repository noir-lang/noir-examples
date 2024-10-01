// https://doc.rust-lang.org/rust-by-example/macros.html
// This is a simple macro named `say_hello`.
macro_rules! say_hello {
    // `()` indicates that the macro takes no argument.
    () => {
        // The macro will expand into the contents of this block.
        println!("Hello!")
    };
}

fn main() {
    println!("\nSIMPLE_MACRO START");
    // This call will expand into `println!("Hello!")`
    let res = say_hello!();
    println!("SIMPLE_MACRO END\n");
    res
}

#[test]
fn test_macros() {
    main()
}
