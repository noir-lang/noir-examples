fn main() {
    println!("Hello, world! Run the tests with:\n  `cargo test -- --nocapture [substring]`");
}

#[allow(unused)]
fn function_of_contents() {
    // appease the compiler and avoid `unused` warnings
    use_macros();
}

// https://doc.rust-lang.org/rust-by-example/macros.html
// This is a simple macro named `say_hello`.
macro_rules! say_hello {
    // `()` indicates that the macro takes no argument.
    () => {
        // The macro will expand into the contents of this block.
        println!("Hello!")
    };
}

fn use_macros() {
    // https://doc.rust-lang.org/rust-by-example/macros.html
    // This call will expand into `println!("Hello!")`
    say_hello!()
}


#[test]
fn test_macros() {
    use_macros()
}
