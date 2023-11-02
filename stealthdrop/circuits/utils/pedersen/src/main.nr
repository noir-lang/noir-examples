use dep::std::hash::pedersen;
use dep::std::println;

fn main(left: Field, right: Field) -> pub Field {
    pedersen([left, right])[0]
}

#[test]
fn test_main() {
    let hash = main(1, 2);
    println(hash);
}
