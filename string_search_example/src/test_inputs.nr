use crate::main;

// "hello" at start of haystack
#[test]
fn finds_substring_at_start() -> Field {
    let mut haystack: [u8; 256] = [0; 256];
    haystack[0] = 104; // 'h'
    haystack[1] = 101; // 'e'
    haystack[2] = 108; // 'l'
    haystack[3] = 108; // 'l'
    haystack[4] = 111; // 'o'

    let mut needle: [u8; 32] = [0; 32];
    needle[0] = 104; // 'h'
    needle[1] = 101; // 'e'
    needle[2] = 108; // 'l'
    needle[3] = 108; // 'l'
    needle[4] = 111; // 'o'

    let (found, index) = main(haystack, 5, needle, 5);
    assert(found == true);
    assert(index == 0);
    1
}

// "def" in the middle of haystack "abcdef"
#[test]
fn finds_substring_in_middle() -> Field {
    let mut haystack: [u8; 256] = [0; 256];
    haystack[0] = 97;  // 'a'
    haystack[1] = 98;  // 'b'
    haystack[2] = 99;  // 'c'
    haystack[3] = 100; // 'd'
    haystack[4] = 101; // 'e'
    haystack[5] = 102; // 'f'

    let mut needle: [u8; 32] = [0; 32];
    needle[0] = 100; // 'd'
    needle[1] = 101; // 'e'
    needle[2] = 102; // 'f'

    let (found, index) = main(haystack, 6, needle, 3);
    assert(found == true);
    assert(index == 3);
    1
}

// "f" at end of haystack "abcdef"
#[test]
fn finds_substring_at_end() -> Field {
    let mut haystack: [u8; 256] = [0; 256];
    haystack[0] = 97;  // 'a'
    haystack[1] = 98;  // 'b'
    haystack[2] = 99;  // 'c'
    haystack[3] = 100; // 'd'
    haystack[4] = 101; // 'e'
    haystack[5] = 102; // 'f'

    let mut needle: [u8; 32] = [0; 32];
    needle[0] = 102; // 'f'

    let (found, index) = main(haystack, 6, needle, 1);
    assert(found == true);
    assert(index == 5);
    1
}

// Needle is not present in haystack
#[test(should_fail)]
fn not_found_if_needle_absent() -> Field {
    let mut haystack: [u8; 256] = [0; 256];
    haystack[0] = 97;  // 'a'
    haystack[1] = 98;  // 'b'
    haystack[2] = 99;  // 'c'
    haystack[3] = 100; // 'd'
    haystack[4] = 101; // 'e'

    let mut needle: [u8; 32] = [0; 32];
    needle[0] = 120; // 'x'
    needle[1] = 121; // 'y'
    needle[2] = 122; // 'z'

    let (found, index) = main(haystack, 5, needle, 3);
    assert(found == false);
    assert(index == 0);
    1
}

// Needle is longer than haystack
#[test]
fn not_found_if_needle_too_long() -> Field {
    let mut haystack: [u8; 256] = [0; 256];
    haystack[0] = 97;  // 'a'
    haystack[1] = 98;  // 'b'
    haystack[2] = 99;  // 'c'

    let mut needle: [u8; 32] = [0; 32];
    for i in 0..32 {
        needle[i] = 97; // fill needle with 'a'
    }

    let (found, index) = main(haystack, 3, needle, 32);
    assert(found == false);
    assert(index == 0);
    1
}

// Needle at second position
#[test]
fn finds_substring_at_second_position() -> Field {
    let mut haystack: [u8; 256] = [0; 256];
    haystack[0] = 120; // 'x'
    haystack[1] = 121; // 'y'
    haystack[2] = 122; // 'z'
    haystack[3] = 123; // '{'

    let mut needle: [u8; 32] = [0; 32];
    needle[0] = 121; // 'y'
    needle[1] = 122; // 'z'

    let (found, index) = main(haystack, 4, needle, 2);
    assert(found == true);
    assert(index == 1);
    1
}

// Full haystack and needle match
#[test]
fn full_haystack_and_needle_match() -> Field {
    let mut haystack: [u8; 256] = [0; 256];
    for i in 0..256 {
        haystack[i] = 55;
    }
    let mut needle: [u8; 32] = [0; 32];
    for i in 0..32 {
        needle[i] = 55;
    }

    let (found, index) = main(haystack, 256, needle, 32);
    assert(found == true);
    assert(index == 0);
    1
}