use dep::poseidon::poseidon2::Poseidon2;

fn main(x: Field, y: pub Field) {
    let res = x * 2 + y;
    let z = Poseidon2::hash([x, y], 32);
    assert(res == 9);
}
