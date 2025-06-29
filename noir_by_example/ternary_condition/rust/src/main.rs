fn main() {
    println!("Selected: {}", select(10, 20, true));  // prints 10
    println!("Selected: {}", select(10, 20, false)); // prints 20
}

fn select(x: u32, y: u32, condition: bool) -> u32 {
    if condition { x } else { y }
}

#[test]
fn test_select_x() {
    assert_eq!(select(10, 20, true), 10);
}

#[test]
fn test_select_y() {
    assert_eq!(select(10, 20, false), 20);
}
