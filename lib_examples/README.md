# 📦 Noir Base64 Zero-Knowledge Proof Example

This example demonstrates **verifiable Base64 encoding and decoding** using Noir’s native `noir_base64_lib`. The zero-knowledge proof shows that inputs and their Base64 encodings match correctly **without revealing the original secret message**.

---

## 📂 Repository Structure

```
/base64_example   # Contains the Noir circuits.
/contract         # Foundry project with a Solidity verifier and test contracts.
/js               # JavaScript code to generate proofs using bb.js.
```

---

## ✅ Tested With

* **Noir**: 1.0.0-beta.6
* **bb**: 0.84.0

---

## 🔧 Installation & Setup

```bash
# Clone the repository and initialize any submodules
git submodule update --init --recursive

# Build Noir circuits and generate the Solidity verifier
(cd base64_example && ./build.sh)

# Install JavaScript dependencies for proof generation
(cd js && yarn)
```

---

## 🛠 Proof Generation with JavaScript (bb.js)

```bash
# Generate proof using bb.js and save to file
(cd js && yarn generate-proof)

# Run Foundry tests to verify the proof in Solidity
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)
```

---

## 🛠 Proof Generation with bb CLI

```bash
cd base64_example

# Generate witness
nargo execute

# Generate proof
bb prove -b ./target/base64_example.json -w ./target/base64_example.gz -o ./target --oracle_hash keccak

# Run Foundry tests
cd ..
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)
```

---

## 🔑 Circuit Overview

```rust
use noir_base64_lib::encode::base64_encode;
use noir_base64_lib::decode::base64_decode;

pub global ENCODE_RUNS: u32 = 3;
pub global DECODE_RUNS: u32 = 1;

fn main(input: [u8; 12], base64_encoded: [u8; 16]) -> pub [u8; 16] {
    for _ in 0..ENCODE_RUNS {
        let encoded = base64_encode(input);
        assert(encoded == base64_encoded, "Encoding failed");
    }

    for _ in 0..DECODE_RUNS {
        let decoded = base64_decode(base64_encoded);
        assert(decoded == input, "Decoding failed");
    }

    base64_encoded
}
```

* The **input message** is private.
* The **Base64 encoding** is public via the `pub` return type.
* Both **encoding and decoding correctness are verified inside the proof**.

---

## 🔒 Key Takeaways

* The circuit ensures **consistency between secret inputs and public outputs**.
* The Solidity verifier checks the **publicly returned Base64 value**.
* This example reflects **modern Noir best practices (Noir 1.0+)**.

---
## 🔄 How the Base64 ZK Circuit Works

This circuit proves **correctness of Base64 encoding and decoding** inside a **zero-knowledge proof** without revealing the actual inputs.

Both the **original input bytes** and their **Base64-encoded output** are verified to match, ensuring that no tampering has occurred.

### Visual Flow:

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
### Key Points:
 - The encoding proves that the provided input correctly maps to the claimed Base64 string.
 - The decoding ensures that the Base64 string recovers the correct original input.
 - The proof does not leak any information about the input or output beyond their correctness.

This pattern can be useful for:

 - Verifying hidden messages without revealing them.
 - Integrity checks where confidentiality is required.
 - Proving pre-processing correctness in larger ZK applications.

## 📚 Third-Party Library

This project uses the following third-party library:

- [`noir_base64_lib`](https://github.com/Envoy-VC/noir_base64_lib) — MIT License

