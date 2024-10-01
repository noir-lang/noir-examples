// https://noir-lang.org/docs/dev/noir/concepts/comptime#lowering
// a compile-time function that returns a `Quoted` type
comptime fn say_hello() -> Quoted {
    quote {
        // the macro will expand into the contents of this quote
        // this single quote isn't divided to take arguments
        println("Hello!")
    }
}

fn main() {
    // This call will unquote into `println!("Hello!")`
    say_hello!()
}

#[test]
fn test_macros() {
    main()
}
