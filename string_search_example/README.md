# Noir Substring Search Circuit

This project demonstrates a robust substring search circuit using the Noir language and the [`noir_string_search`](https://github.com/noir-lang/noir_string_search) Noir library.  
It provides a wrapper around the library's substring search to handle edge cases safely, making it suitable for use in zero-knowledge circuits.

## Features

- **Safe Substring Search:** Returns both a `found` boolean and the index of the first match.
- **Edge Case Handling:** Returns `(false, 0)` if the needle is empty, longer than the haystack, or not present.
- **Noir Library Compatibility:** Only calls the underlying library when it is safe to do so, avoiding panics/assertion failures.
- **Comprehensive Tests:** Includes unit tests for common and edge cases.

## Usage

### Adding noir_string_search to your project

To use `noir_string_search`, add it to your `Nargo.toml` dependencies section like this:

```toml
[dependencies]
noir_string_search = { git = "https://github.com/noir-lang/noir_string_search" }
```

Then, import it in your Noir code:

```rust
use noir_string_search::{StringBody256, SubString32};
```

### Circuit Interface

```rust
pub fn substring_search(
    haystack: [u8; 256],
    haystack_len: u32,
    needle: [u8; 32],
    needle_len: u32,
) -> (bool, u32)
```

- `haystack`: The byte array to search in (max length 256).
- `haystack_len`: The actual length of the haystack.
- `needle`: The substring to search for (max length 32).
- `needle_len`: The actual length of the needle.
- **Returns**: `(found, index)`  
  - `found`: `true` if the substring was found, `false` otherwise.
  - `index`: the starting index of the first match (0 if not found).

### Example

```rust
let (found, index) = main(haystack, haystack_len, needle, needle_len);
assert(found == true);
assert(index == 3);
```

## Implementation

The circuit only attempts the underlying library search if:
- The needle is not empty.
- The needle length does not exceed the haystack length.

Otherwise, it returns `(false, 0)`.

## Test Coverage

The provided tests cover:
- Substring at start, middle, and end of haystack.
- Needle absent from haystack.
- Needle longer than haystack.
- Needle at second position.
- Full haystack and needle match.

Example test:

```rust
#[test]
fn finds_substring_at_start() -> Field {
    // haystack = "hello", needle = "hello"
    let (found, index) = main(haystack, 5, needle, 5);
    assert(found == true);
    assert(index == 0);
    1
}
```

## Requirements

- [Noir](https://noir-lang.org/)
- [`noir_string_search`](https://github.com/noir-lang/noir_string_search) Noir library

## License

MIT or Apache-2.0