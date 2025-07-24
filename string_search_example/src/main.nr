use noir_string_search::{StringBody256, SubString32};
mod test_inputs;

pub fn substring_search(
    haystack: [u8; 256],
    haystack_len: u32,
    needle: [u8; 32],
    needle_len: u32,
) -> (bool, u32) {
    assert(haystack_len <= 256);
    assert(needle_len <= 32);

    let is_empty: bool = needle_len == 0;
    let too_long: bool = needle_len > haystack_len;
    let normal_case: bool = !is_empty & !too_long;

    let mut found: bool = false;
    let mut index: u32 = 0;

    if normal_case {
        let haystack_body = StringBody256::new(haystack, haystack_len);
        let needle_body = SubString32::new(needle, needle_len);
        let (lib_found, lib_index) = haystack_body.substring_match(needle_body);
        found = lib_found;
        index = lib_index;
    }

    // Output: set only when normal_case, else (false, 0)
    let out_found: bool = if normal_case { found } else { false };
    let out_index: u32 = if normal_case { index } else { 0 };

    (out_found, out_index)
}

fn main(
    haystack: [u8; 256],
    haystack_len: u32,
    needle: [u8; 32],
    needle_len: u32
) -> pub (bool, u32) {
    substring_search(haystack, haystack_len, needle, needle_len)
}