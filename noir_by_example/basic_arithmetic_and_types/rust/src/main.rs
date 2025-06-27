fn main() {
	let x: u32 = 3;
	let y: u32 = 4;
	
	let sum = x + y;
	let product = x * y;
	let greater_than_zero: bool = sum > 0;
	
	println!("sum: {}", sum);
	println!("product: {}", product);
	println!("sum > 0? {}", greater_than_zero);
}
