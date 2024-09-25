fn main() {
    println("Hello, world! Run the tests with:\n  `nargo test --show-output [substring]`");
}

// Don't need this, Noir doesn't yet warn like Rust
// #[allow(unused)]
// fn function_of_contents() {
//     // appease the compiler and avoid `unused` warnings
//     use_macros();
// }

// https://noir-lang.org/docs/dev/noir/concepts/comptime#lowering
// a compile-time function that returns a `Quoted` type
comptime fn say_hello() -> Quoted {
    quote {
        // the macro will expand into the contents of this quote
        // this single quote isn't divided to take arguments
        println("Hello!")
    }
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
