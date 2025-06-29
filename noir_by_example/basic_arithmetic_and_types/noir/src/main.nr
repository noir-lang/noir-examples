fn main(x: pub Field, y: pub Field, expected_sum: pub Field, expected_mul: pub Field) {
	let sum = x + y;
	let product = x * y;
	assert(sum == expected_sum);
	assert(product == expected_mul);
}

#[test]
fn test_arithmetic() {
	let x = 3;
	let y = 4;
	let expected_sum = 7;
	let expected_mul = 12;
	
	let sum = x + y;
	let product = x * y;
	
	assert(sum == expected_sum);
	assert(product == expected_mul);
}
