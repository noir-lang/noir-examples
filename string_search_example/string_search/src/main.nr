use noir_string_search::{StringBody256, SubString32};
mod test_inputs;

/// Substring search circuit-friendly: returns (found, index)
/// - If needle is empty -> found=true at index 0.
/// - If needle too long -> found=false at index 0.
/// - Otherwise -> uses library substring_match.
pub fn substring_search(
    haystack: [u8; 256],
    haystack_len: u32,
    needle: [u8; 32],
    needle_len: u32,
) -> (bool, u32) {
    // Input validation
    assert(haystack_len <= 256);
    assert(needle_len <= 32);

    // Initialize default output
    let mut result_found = false;
    let mut result_index = 0;

    // Handle cases
    if needle_len == 0 {
        // Empty needle -> deterministic match at index 0
        result_found = true;
        result_index = 0;
    } else if needle_len > haystack_len {
        // Invalid case -> needle longer than haystack
        result_found = false;
        result_index = 0;
    } else {
        // Normal case: call substring library
        let haystack_body: StringBody256 = StringBody256::new(haystack, haystack_len);
        let needle_body: SubString32 = SubString32::new(needle, needle_len);
        let (found, index) = haystack_body.substring_match(needle_body);

        result_found = found;
        result_index = index;
    }

    (result_found, result_index)
}

/// Noir entry point
fn main(
    haystack: [u8; 256],
    haystack_len: u32,
    needle: [u8; 32],
    needle_len: u32,
) -> pub (bool, u32) {
    substring_search(haystack, haystack_len, needle, needle_len)
}
