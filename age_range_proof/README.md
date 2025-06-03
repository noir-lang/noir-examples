# 🧾 Age Range Zero-Knowledge Proof (Noir)

This project implements a zero-knowledge proof circuit in [Noir](https://noir-lang.org/) that allows a user to prove their age lies within a valid range (e.g. 18 to 60) **without revealing their actual age**.

It uses the `bb` backend with the `ultra_honk` scheme and supports exporting a Solidity verifier contract for on-chain use.

⚠️ This example does not use a trusted credential system — the user can input any value they choose. It is intended as an educational example of range constraints in Noir.

For real-world use cases involving verified identity and age proofs using ZK credentials, see:
- [zkPassport](https://docs.zkpassport.id/intro)
- [Privado ID (formerly Polygon ID)](https://www.privado.id/) — a decentralized identity protocol that allows users to prove claims (like age over 18) without revealing personal information.
-  [Privado ID Documentation](https://docs.privado.id/) — for developers looking to integrate ZK-based credentials into applications.

---
## Purpose

This example is educational and meant to show:
- How to use `assert` for value checks
- How to write test cases for valid/invalid inputs
- How to structure a simple Noir project


## 🚀 Quickstart

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [nargo](https://noir-lang.org/docs/getting_started/quick_start#installation)
- [bb](https://github.com/AztecProtocol/aztec-packages/tree/master/barretenberg#installation)

Install `bb` and `nargo`:

```bash
cargo install --locked nargo
cargo install --locked bb

curl https://sh.rustup.rs -sSf | sh -s -- -y
source $HOME/.cargo/env
cargo install --locked nargo bb
```

Clone the repo and make all scripts executable:

```bash
git clone https://github.com/noir-lang/noir-examples.git
cd noir-examples
cd age_range_proof
```

Make all scripts executable:

```bash
chmod +x scripts/*.sh
```

## 📁 Directory Structure

```bash
├── .github/                # GitHub Actions workflows for CI/CD
│   └── workflows/          # YAML files defining automated workflows (e.g., test on push)
├── onchain/                # Smart contract outputs
│   └── Verifier.sol        # Auto-generated Solidity verifier for onchain use
├── scripts/                # Automation scripts for your zk pipeline
│   ├── build.sh            # Full build pipeline (compile, prove, verify, export verifier)
│   ├── clean.sh            # Cleans target/ for fresh builds
│   ├── export_solidity_verifier.sh  # Optional manual verifier export
│   ├── keygen.sh           # VK generation script (optional if build.sh handles it)
│   ├── prove.sh            # Standalone proof creation (optional modular use)
│   ├── test.sh             # Test multiple inputs end-to-end
│   └── verify.sh           # Standalone verifier runner
├── src/                    # Noir circuit logic
│   └── main.nr             # Your actual Noir circuit and tests
├── target/                 # Build artifacts (proofs, keys, verifier contract)
├── .gitignore              # To exclude target/, secrets, etc.
├── input.json              # Example input to your circuit
├── Nargo.toml              # Noir project config
├── Prover.toml             # Additional config for `bb` prover
├── README.md               # Project documentation
```

## 🔧 Circuit Logic

The circuit takes a **private** `age` **input** and checks it falls in the valid range:

```rust
assert(age >= min_age, "Too young");
assert(age <= max_age, "Too old");
```

It outputs a proof that the prover knows a valid age without revealing it.

## 🛠️ Using the Build and Test Scripts

This project includes several handy scripts to automate building, testing, and verifying zero-knowledge proofs using the `bb` and `nargo` toolchains.
`build.sh` – **Full build pipeline**
You can run the build script with or without an argument:

```bash
./scripts/build.sh 42    # Uses age = 42
./scripts/build.sh       # Uses age = 35 by default
```

This behavior is enabled by the following line in `build.sh`:

```bash
AGE=${1:-35}
```

_\*\*Explanation_:

- If you provide an argument (e.g., `42`), that value is used as the input age.
- If you omit the argument, it defaults to `35`.
  This allows you to quickly test a default run, or pass a specific age as needed.

`build.sh`:

- Compiles the circuit
- Generates the witness and proof
- Creates or reuses a verification key
- Verifies the proof
- Exports the Solidity verifier contract

`clean.sh` – **Clean output artifacts**

```bash
./scripts/clean.sh
```

Cleans the build artifacts by deleting the `target` directory. Use this to start fresh.

`keygen.sh`
Generates the verification key separately (usually called automatically by `build.sh` if needed).

```bash
./scripts/keygen.sh
```

`test.sh` – **Run tests on various ages**
To test for multiple ages automatically, you should use your test.sh script which runs build.sh for a set of ages. You run:

```bash
./scripts/test.sh
```

This script loops over predefined ages (e.g., 17, 18, 35, 60, 61) and runs the full build pipeline on each, reporting success or failure.

To test for a single age like 42, you run:

```bash
./scripts/build.sh 42
```

## 🧾 Export Solidity Verifier

To export a Solidity verifier contract:

```bash
./scripts/export_verifier.sh
```

This uses:

```bash
bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
```

## Example Output (Valid Proof)

```bash
🚧 Starting full build pipeline...
✅ Proof verified successfully
✅ Verifier exported to ./target/Verifier.sol
🎉 Build pipeline completed successfully
```

`verify.sh`
Verifies the generated proof using the verification key. Automatically runs `keygen.sh` if the verification key is missing.

```bash
./scripts/verify.sh
```

`prove.sh <age>`
Compiles the circuit, generates the witness, and creates a proof for the given age (lower-level script). You can run the build script with or without an argument:

```bash
./scripts/build.sh 42    # Uses age = 42
./scripts/build.sh       # Defaults to age = 35
```

This allows you to quickly test a default run, or pass a specific age as needed.

## 📦 GitHub Actions (CI Example)

To enable automatic build and testing on each push, use this `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: |
          curl https://sh.rustup.rs -sSf | sh -s -- -y
          source $HOME/.cargo/env
          cargo install --locked nargo bb

      - name: Run tests
        run: ./scripts/test.sh
```
## ⚠️ Caveats

This example does **not** verify the truth of the user's input — it simply enforces that the input lies within a certain range.

In real-world applications, such a circuit would be combined with trusted cryptographic credentials (e.g., a government-issued age proof). For such cases, check out:
- [zkPassport](https://docs.zkpassport.id/intro)
- [Privado ID (formerly Polygon ID)](https://www.privado.id/) 
-  [Privado ID Documentation](https://docs.privado.id/) 

## 📝 License

MIT License. Feel free to use and adapt this project.

## 🤝 Contributing

Contributions and suggestions welcome! Please open an issue or pull request.
