# Noir Base64 Library

This library provides implementations for Base64 and URL based encoding and decoding over fixed sized arrays and Vectors in Noir programming language.

Available functions:

### Encoding functions

- `base46_encode`: Encodes a fixed size array of bytes into a base64 encoded array.
- `base46_encode_var`: Encodes a vector of bytes into a base64 encoded vector.
- `base46_encode_url`: Encodes a fixed size array of bytes into a base64 URL encoded array.
- `base64_encode_url_var`: Encodes a vector of bytes into a base64 URL encoded vector.

### Decoding functions

- `base46_decode`: Decodes a base64 encoded array into a fixed size array of bytes.
- `base46_decode_var`: Decodes a base64 encoded vector of bytes into a vector.
- `base64_decode_url`: Decodes a base64 URL encoded array into a fixed size array of bytes.
- `base64_decode_url_var`: Decodes a base64 URL encoded vector of bytes into a vector.

## Installation

In your `Nargo.toml` file, add the version of this library you would like to install under dependency:

```toml
[dependencies]
noir_base64_lib = { tag = "v1.0.0", git = "https://github.com/Envoy-VC/noir_base64_lib" }
```

## Usage

For Fixed Size Arrays

```noir
fn main() {
    let input: [u8; 12] = "Hello World!".as_bytes();
    let expected: [u8; 16] = "SGVsbG8gV29ybGQh".as_bytes();

    let result = base64_encode(input);
    assert(result == expected);

    let decoded = base64_decode(result);
    assert(input == decoded);
}
```

For Vectors

```noir
fn main() {
    let input: Vec<u8> = "Hello World!".as_bytes_vec();
    let expected: Vec<u8> = "SGVsbG8gV29ybGQh".as_bytes_vec();

    let result: Vec<u8> = base64_encode_var(input);


    let decoded: Vec<u8> = base64_decode_var(result);
}
```
