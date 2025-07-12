# 🔒 Noir Base64 Encoding & Decoding ZK Circuit Example

This project demonstrates **zero-knowledge verifiable Base64 encoding and decoding** in Noir, using the official [`noir_base64_lib`](https://github.com/Envoy-VC/noir_base64_lib). The circuit proves that a private input and its public Base64 encoding match, without leaking the original secret.

---

## 📂 Repository Structure

```
/base64_example   # Noir circuit for Base64 encode/decode proof
/contract         # Foundry/Hardhat Solidity verifier and integration tests
/js               # JavaScript utilities for proof generation (bb.js)
```

---

## ✅ Tested With

- **Noir**: 1.0.0-beta.6
- **bb.js**: 0.84.0

---

## 🔧 Installation & Setup

```bash
# Clone and set up submodules
git submodule update --init --recursive

# Build Noir circuits and generate Solidity verifier
(cd base64_example && ./build.sh)

# Install JS dependencies for proof generation
(cd js && yarn)
```

---

## 🛠 Proof Generation with JavaScript (bb.js)

```bash
# Generate proof using bb.js
(cd js && yarn generate-proof)

# Run Solidity integration tests with Foundry
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)
```

---

## 🛠 Proof Generation with bb CLI

```bash
cd base64_example

# Generate witness using Nargo
nargo execute

# Generate proof with bb CLI
bb prove -b ./target/base64_example.json -w ./target/base64_example.gz -o ./target --oracle_hash keccak

# Verify in Solidity
cd ..
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)
```

---

## 🔑 Circuit Overview

```rust
use noir_base64_lib::encode::base64_encode;
use noir_base64_lib::decode::base64_decode;

/// Noir Base64 Encode/Decode Circuit
/// - If `do_encode` is true, encodes the first 12 bytes of `input` as base64.
///   - Asserts unused bytes (input[12..16]) are zero for safety.
/// - If `do_encode` is false, decodes all 16 bytes of `input` as base64.
///   - Invalid base64 input aborts the circuit (library asserts).
///   - Output is zero-padded to 16 bytes.
/// - Output: 
///   - [u8; 16]: Encoded or decoded result (decoded is zero-padded).
///   - bool: is_valid (always true if circuit does not abort).
/// - All inputs are private; output is public.
fn main(input: [u8; 16], do_encode: bool) -> pub ([u8; 16], bool) {
    if do_encode {
        // Validate unused input bytes are zero
        for i in 12..16 {
            assert(input[i] == 0, "Unused input bytes for encoding must be zero");
        }
        let mut short_input: [u8; 12] = [0; 12];
        for i in 0..12 {
            short_input[i] = input[i];
        }
        let encoded: [u8; 16] = base64_encode(short_input);
        (encoded, true)
    } else {
        let decoded: [u8; 12] = base64_decode(input);    // Will abort on invalid base64
        let mut output: [u8; 16] = [0; 16];
        for i in 0..12 {
            output[i] = decoded[i];
        }
        // If circuit did not abort, base64 was valid
        (output, true)
    }
}
```
- The **input message** is private.
- The **Base64 encoding** is public via the `pub` return type.
- Both encoding and decoding correctness are enforced inside the circuit, verifiable by anyone.

---

## 🔄 How the Base64 ZK Circuit Works

This circuit proves **correctness of Base64 encoding and decoding** inside a **zero-knowledge proof**, without revealing the actual input.

### Visual Flow

```plaintext
┌─────────────────────────────┐
│      Original Input Bytes    │
│  e.g., "Hello World!"        │
│  [72, 101, 108, 108, ...]    │
└─────────────┬───────────────┘
              │
              │ base64_encode(input)
              │
┌─────────────▼───────────────┐
│      Base64 Encoded Bytes    │
│  e.g., "SGVsbG8gV29ybGQh"    │
│  [83, 71, 86, 115, ...]      │
└─────────────┬───────────────┘
              │
              │ base64_decode(encoded)
              │
┌─────────────▼───────────────┐
│  Recovered Original Bytes    │
│ Should match original input  │
└─────────────────────────────┘
```

#### Key Points:
- **Encoding** proves that the secret input matches the claimed Base64 string.
- **Decoding** confirms that the Base64 string recovers the correct original input.
- The proof only reveals the public Base64 string, not the secret input.

**Applications:**
- Verifying hidden messages without revealing them.
- Confidentiality-preserving integrity checks.
- Proving preprocessing correctness in larger ZK workflows.

---

## 📚 Third-Party Library

- [`noir_base64_lib`](https://github.com/Envoy-VC/noir_base64_lib) — MIT License

---