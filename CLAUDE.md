# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a reference repository of examples for writing zero-knowledge circuits and applications with [Noir](https://noir-lang.org/). Each subdirectory is a standalone example project demonstrating different Noir use cases and integration patterns.

## Prerequisites

- **Noir (nargo)**: Install via `noirup` - [installation instructions](https://noir-lang.org/docs/getting_started/installation)
- **Barretenberg (bb)**: Install via `bbup` - the proving backend for Noir circuits
- **Node.js/Yarn**: For JavaScript/TypeScript examples
- **Foundry**: Required for Solidity verification examples (`curl -L https://foundry.paradigm.xyz | bash`)

Quick setup for all examples:
```bash
chmod +x ./scripts/setup-all.sh
./scripts/setup-all.sh
```

## Core Development Commands

### Noir Circuit Development

```bash
# Compile a Noir circuit
nargo compile

# Run tests in a Noir circuit
nargo test

# Execute circuit to generate witness
nargo execute

# Generate verifier contract (for Solidity integration)
nargo codegen-verifier

# Prove with bb CLI
bb prove -b ./target/<circuit_name>.json -w target/<circuit_name>.gz -o ./target --oracle_hash keccak

# Generate verification key
bb write_vk --oracle_hash keccak -b ./target/<circuit_name>.json -o ./target

# Generate Solidity verifier
bb write_solidity_verifier -k ./target/vk -o <output_path>/Verifier.sol
```

### JavaScript/TypeScript Proof Generation

Most examples use `yarn` for package management:
```bash
# Install dependencies
yarn install

# Generate proofs (common script name)
yarn generate-proof

# Run tests
yarn test
```

### Foundry (Solidity Examples)

```bash
# Test Solidity contracts with proof verification
forge test --optimize --optimizer-runs 5000 --gas-report -vvv

# Build contracts
forge build

# Deploy (example from solidity-example)
forge script script/Deploy.s.sol:DeployScript --rpc-url <RPC_URL> --broadcast --legacy
```

## Project Structure

### Main Examples

- **`solidity-example/`** - End-to-end example of generating Noir proofs and verifying them on-chain with Solidity verifiers
  - `/circuits` - Noir circuit source
  - `/js` - JavaScript proof generation using `@noir-lang/noir_js` and `@aztec/bb.js`
  - `/contract` - Foundry project with Solidity verifier contracts
  - Build: `(cd circuits && ./build.sh)` compiles circuit and generates Solidity verifier

- **`recursion/`** - Demonstrates recursive proof generation where one circuit verifies another circuit's proof
  - `/circuits/inner` - Inner circuit that gets proven first
  - `/circuits/recursive` - Outer circuit that verifies the inner proof
  - `/js` - TypeScript code for generating both proofs
  - Build: `(cd circuits && ./build.sh)` compiles both circuits

- **`web-starter/`** - Browser-based proof generation examples
  - `/circuits` - Simple Noir circuit
  - `/web/vite` - Vite bundler setup
  - `/web/webpack` - Webpack bundler setup
  - `/web/nextjs` - Next.js integration
  - Each web framework requires: circuit compilation (`./circuits/build.sh`), then framework-specific setup

- **`bignum_example/`** - Demonstrates `noir-bignum` library for BLS12-381 field arithmetic
  - Minimal example focusing only on Noir circuit usage
  - Run: `nargo execute` in circuits directory

- **`lib_examples/`** - Examples using Noir libraries
  - `base64_example/` - Base64 encoding/decoding using `noir-base64` library
  - Uses workspace structure with shared Nargo.toml

- **`noir_by_example/`** - Small focused examples of Noir language features
  - `loops/` - Loop constructs in Noir
  - `generic_traits/` - Generic types and traits
  - `simple_macros/` - Macro usage
  - Each has both `/noir` (circuit) and `/rust` (host code) directories

## Architecture Patterns

### Noir Circuit Structure

Noir circuits are defined in `src/main.nr` files within a Nargo project:
- `Nargo.toml` - Project configuration (similar to Cargo.toml)
- `Prover.toml` - Input values for circuit execution
- `src/main.nr` - Main circuit logic
- Compiled artifacts go to `target/` directory

Circuit main function signature:
```noir
fn main(private_input: Field, public_output: pub Field) {
    // Circuit constraints
}
```

### JavaScript Proof Generation Pattern

Common pattern across examples using `@noir-lang/noir_js` (v1.0.0-beta.18) and `@aztec/bb.js` (v3.0.0-nightly.20260102):
1. Import compiled circuit artifacts from `target/` directory
2. Initialize Noir program with artifacts
3. Generate witness from inputs
4. Use Barretenberg backend to generate proof
5. (Optional) Verify proof or pass to Solidity verifier

### Solidity Verification Pattern

1. Generate Solidity verifier using `bb write_solidity_verifier`
2. Deploy verifier contract to EVM chain
3. Format proof and public inputs for Solidity
4. Call verifier contract's `verify()` function

## Version Compatibility

**Recent Updates (January 2026):**
- All main examples updated to Noir 1.0.0-beta.18 and bb.js 3.0.0-nightly.20260102
- The `stealthdrop/` example has been removed from the repository

Current version information:
- `solidity-example/`: Noir 1.0.0-beta.18, bb.js 3.0.0-nightly.20260102
- `recursion/`: Noir 1.0.0-beta.18, bb.js 3.0.0-nightly.20260102
- `web-starter/`: Noir 1.0.0-beta.18, bb.js 3.0.0-nightly.20260102
- `bignum_example/`: Noir 1.0.0+ (>=1.0.0)
- `lib_examples/base64_example/`: Noir 0.36.0+
- `noir_by_example/`: Noir 0.34.0+ (varies by example)

Check each project's README for specific version requirements. Version mismatches between nargo and bb can cause compilation or proof generation issues.

## Testing Strategy

- **Noir unit tests**: Use `#[test]` annotations in `.nr` files, run with `nargo test`
- **JavaScript tests**: Usually TypeScript files with test runner (Node.js `--test` or similar)
- **Solidity tests**: Foundry tests in `/test` directories
- **E2E tests**: Some examples have Playwright tests for browser proving

## Common Build Scripts

Most circuit directories contain a `build.sh` script that:
1. Compiles the Noir circuit with `nargo compile`
2. Generates verification key with `bb write_vk`
3. (For Solidity examples) Generates Solidity verifier contract

Always run the build script after modifying circuits.

## Contributing Notes

When adding new examples (per CONTRIBUTING.md):
1. Include Noir circuits
2. Provide execution context (JS/browser/Solidity)
3. Write comprehensive README with setup/run instructions
4. Add automated tests and CI workflow in `.github/workflows/`

Original authors/maintainers for questions: @critesjosh, @signorecello

## PR Review Guidelines

When reviewing pull requests that add new examples, ensure the following requirements are met:

### Example Quality
- **Simplicity**: New examples should be simple and easy to understand. They should focus on demonstrating a specific concept or integration pattern without unnecessary complexity.
- **Clear Purpose**: The example should have a well-defined educational goal that's distinct from existing examples.

### README Requirements
Every new example MUST include a comprehensive README.md that explains:

1. **What the example is**: Clear description of what the example demonstrates and why it's useful
2. **What's included**: Overview of the folder structure and key files
   - Example: "`/circuits` - Noir circuit source, `/js` - Proof generation code, `/contract` - Solidity verifier"
3. **How to run**: Step-by-step instructions including:
   - Prerequisites and installation steps
   - Build commands
   - Execution commands
   - Expected output
   - Common troubleshooting tips

### CI/CD Requirements
New examples MUST include a GitHub Actions workflow in `.github/workflows/` that:

1. **Runs on PRs**: Tests should run when the example's files are modified
   ```yaml
   on:
     pull_request:
       paths:
         - "example-name/**"
   ```

2. **Runs nightly**: Include a scheduled run at 2 AM UTC
   ```yaml
     schedule:
       - cron: "0 2 * * *"
   ```

3. **Includes workflow_dispatch**: Allow manual triggering
   ```yaml
     workflow_dispatch:
   ```

4. **Notifies on failure**: Must create an issue when nightly tests fail
   ```yaml
   permissions:
     issues: write

   - name: Create issue on failure (nightly)
     if: failure() && github.event_name == 'schedule'
     uses: actions/github-script@v6
     with:
       script: |
         github.issues.create({
           owner: context.repo.owner,
           repo: context.repo.repo,
           title: '[Nightly] Example-name workflow failed',
           body: `The nightly example-name workflow failed. Please investigate.\n\n/cc @noir-lang/developerrelations`,
           labels: ['nightly', 'bug']
         })
   ```

5. **Comprehensive testing**: Should test the complete workflow:
   - Compile Noir circuits (`nargo compile`)
   - Run Noir unit tests (`nargo test`)
   - Execute proof generation
   - (If applicable) Verify proofs on-chain or in JavaScript

### Review Checklist
- [ ] Example is simple and focused on one concept
- [ ] README explains what, why, and how
- [ ] README includes folder structure overview
- [ ] README has complete setup and run instructions
- [ ] CI workflow runs on PRs with path filter
- [ ] CI workflow runs nightly (cron schedule)
- [ ] CI workflow creates issues on nightly failures
- [ ] Tests cover the complete example workflow
- [ ] Example works with current stable Noir/bb versions (or documents version requirements)
