// Function that computes a 10% discount if eligible
fn get_discount(price: u32, eligible: bool) -> u32 {
    if eligible {
        price * 90 / 100
    } else {
        price
    }
}

fn main() {
    let price = 100;
    let eligible = true;
    let discounted_price = get_discount(price, eligible);
    println!("Discounted price: {}", discounted_price);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_discount_applies() {
        let result = get_discount(100, true);
        assert_eq!(result, 90);
    }

    #[test]
    fn test_no_discount() {
        let result = get_discount(100, false);
        assert_eq!(result, 100);
    }
}
