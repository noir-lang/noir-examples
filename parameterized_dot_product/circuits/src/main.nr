use dep::std::println;

fn main(x: [Field; 4], y: [Field; 4], expect: pub Field) {
    let out = dotproduct(x, y);
    println("x: ");
    println(x);
    println("y: ");
    println(y);
    println("computed dotproduct: ");
    println(out);
    assert(out == expect);
}

fn dotproduct(x: [Field; 4], y: [Field; 4]) -> Field {
    let mut out = 0;
    for i in 0..4 {
        out += x[i] * y[i];
    }
    out
}

#[test]
fn test_main() {
    assert(dotproduct([1, 2, 3, 4], [5, 6, 7, 8]) == 70);
}