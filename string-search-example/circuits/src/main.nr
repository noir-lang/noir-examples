use noir_string_search::{StringBody256, SubString32};
mod test_inputs;
/// Convert a bool to Field (1 or 0 for selector logic)
fn bool_to_field(b: bool) -> Field {
    if b { 1 } else { 0 }
}

/// Substring search circuit-friendly: returns (found, index)
/// - If needle is empty, found=true at index 0.
/// - If needle too long, found=false at index 0.
/// - Otherwise, use library match.
pub fn substring_search(
    haystack: [u8; 256],
    haystack_len: u32,
    needle: [u8; 32],
    needle_len: u32,
) -> (bool, u32) {
    assert(haystack_len <= 256);
    assert(needle_len <= 32);

    let haystack_body: StringBody256 = StringBody256::new(haystack, haystack_len);
    let needle_body: SubString32 = SubString32::new(needle, needle_len);
    let (found, index) = haystack_body.substring_match(needle_body);

    let is_empty = needle_len == 0;
    let too_long = needle_len > haystack_len;

    // Field selectors for circuit-friendly output selection
    let is_empty_f = bool_to_field(is_empty);
    let too_long_f = bool_to_field(too_long);
    let normal_case_f = 1 - is_empty_f - too_long_f;

    // Use selectors to choose output
    let result_found_f: Field = is_empty_f + normal_case_f * bool_to_field(found);
    let result_index: u32 = (is_empty_f * 0 + too_long_f * 0 + normal_case_f * index as Field) as u32;

    (result_found_f == 1, result_index)
}

// Noir entry point
fn main(
    haystack: [u8; 256],
    haystack_len: u32,
    needle: [u8; 32],
    needle_len: u32,
) -> pub (bool, u32) {
    substring_search(haystack, haystack_len, needle, needle_len)
}
