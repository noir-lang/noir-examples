# Noir Elliptic Curve Discrete Log Proof Circuit

This repository contains a Noir circuit for proving knowledge of the discrete logarithm on the secp256k1 elliptic curve. The circuit demonstrates, in zero-knowledge, that the prover knows a secret scalar \( k \) such that \( Q = k \cdot G \), where \( G \) is a public point and \( Q \) is the resulting public point.

## Features

- **Proves knowledge of discrete log:**  
  Given a base point \( G = (x, y) \), a secret scalar \( k \) (kept private), and a result point \( Q = (x', y') \), the circuit proves that \( Q = k \cdot G \) without revealing \( k \).

- **Curve Membership Checks:**  
  Both \( G \) and \( Q \) are asserted to be on the secp256k1 curve.

- **Flexible Test Suite:**  
  Includes tests for:
  - Correct proofs (valid \( k \), \( G \), \( Q \))
  - Invalid results
  - Non-curve points
  - Edge cases (e.g., zero scalar, point at infinity)

## Structure

- `src/main.nr`  
  Main Noir circuit, containing the core logic and tests.
- `src/`  
  May contain additional helper or test files.
- `README.md`  
  This file.

## Usage

### Requirements

- [Noir](https://noir-lang.org/) (v0.18+ recommended)
- [nargo](https://noir-lang.org/docs/getting_started/quick_start#installation) (Noir package manager)
- Rust (for installing Noir)

### Running Tests

To run all tests:

```bash
nargo test