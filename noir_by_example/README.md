# Examples showcasing syntax, libraries, and data structures

These will show Noir side-by-side against [Rust by example](https://doc.rust-lang.org/rust-by-example/).

The goal is to highlight the similarities and differences in the language and design patterns.

## Tooling

You will need:
- `nargo` installed [via noirup](https://noir-lang.org/docs/getting_started/installation/)
- `cargo` installed [via rustup](https://www.rust-lang.org/tools/install) (optional: to see Rust output)

## What is not covered

The surrounding build artifacts (and additional proving/verifying artifacts for Noir) are not explored in this example.

# Usage

## Running main

- `nargo execute`
- `cargo run`

## Running tests

Tests are used so as to stay focused on the language, putting aside the greater differences around program artifacts and their use.

Simply run:
- `nargo test`
- `cargo test`

Specific functions can be selected for testing by adding a substring of a test function name: `nargo test macro`

To see println output

# Adding to this repository - GOOD FIRST ISSUES

The Noir documentation has many good pages explaining the syntax with examples, similarly with Rust.

For instance for macro function example:
- Noir example in [(Quasi) Quote](https://noir-lang.org/docs/dev/noir/concepts/comptime#lowering)
- Rust example in [macros](https://doc.rust-lang.org/rust-by-example/macros.html)

Example functions can be added to [main.nr](./src/main.nr) with a 1:1 corresponding [main.rs](./src/main.rs) equivalent.

# How this directory was created

- Create the directory and go into it: `mkdir noir_by_example && cd noir_by_example`
- For simplicity we will initialize both a rust and noir binary projects in the same directory:
  - Rust: `cargo init`
  - Noir: `nargo init`
- Then make additions to the main files of each and test