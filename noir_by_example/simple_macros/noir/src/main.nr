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
    println("\nSIMPLE_MACRO START");
    // This call will unquote into `println!("Hello!")`
    let res = say_hello!();
    println("SIMPLE_MACRO END\n");
    res
}

#[test]
fn test_macros() {
    main()
}
