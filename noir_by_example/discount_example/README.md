# Discount Example – Noir vs Rust

This example demonstrates conditional logic in both Noir and Rust. Given a price and a discount eligibility flag:

- If the user is eligible, a 10% discount is applied.
- Otherwise, the full price is returned.

## Noir
Tested with Noir `v1.0.0-beta.6`. The logic is implemented in `main.nr`.

## Rust
The equivalent logic is implemented in `main.rs` and run with `cargo run`.

## Usage

```bash
nargo test --show-output
cargo test -- --nocapture
