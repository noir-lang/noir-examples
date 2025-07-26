# Bignum Example

This directory contains a minimal Noir example demonstrating the use of the [`noir-bignum`](https://github.com/noir-lang/noir-bignum) library for BLS12-381 field arithmetic, compatible with Noir v1.0.0-beta.9 and later.

## What this example does

- Shows how to use `BLS12_381_Fr` bignum types in Noir circuits.
- Demonstrates addition, subtraction, multiplication, and division of large field elements.
- Asserts that the provided public outputs are correct for the inputs.

## Files

- `main.nr` &mdash; The Noir circuit implementing bignum arithmetic.
- `Prover.toml` &mdash; Example inputs (as limbs) for the circuit.
- `README.md` &mdash; This file.

## Running the Example

1. **Install Noir**  
   Follow the latest instructions at: [noir-lang.org/docs/getting_started/installation](https://noir-lang.org/docs/getting_started/installation)

2. **Generate or provide input values**  
   You may generate new limb representations for your own field elements if needed.

3. **Run the circuit**
   ```sh
   nargo execute
   ```

   If the values in `Prover.toml` are correct, you should see:
   ```
   [bignum_example] Circuit witness successfully solved
   [bignum_example] Witness saved to target/bignum_example.gz
   ```

## Notes

- This example is intentionally minimal, focusing only on the core use of `noir-bignum`.
- No additional dependencies, Solidity, or off-chain tooling are included.

## References

- [noir-bignum library](https://github.com/noir-lang/noir-bignum)
- [Noir documentation](https://noir-lang.org/docs/)
- [noir-examples issue #30](https://github.com/noir-lang/noir-examples/issues/30)