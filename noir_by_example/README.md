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

To see output from `println`:
- `nargo test --show-output`
- `cargo test -- --nocapture`

To test specific functions, a substring of its name can be added to the end.
Eg, `nargo test macro`, to run tests who's name contains the string `macro`.

# Adding to this repository - GOOD FIRST ISSUES

The Noir documentation has many good pages explaining the syntax with examples, similarly with Rust.

For instance for macro function example:
- Noir example in [(Quasi) Quote](https://noir-lang.org/docs/dev/noir/concepts/comptime#lowering)
- Rust example in [macros](https://doc.rust-lang.org/rust-by-example/macros.html)

Example functions can be added to [main.nr](./noir/src/main.nr) with a 1:1 corresponding [main.rs](./rust/src/main.rs) equivalent.

# How this directory was created

- Create the directory and go into it: `mkdir noir_by_example && cd noir_by_example` (For Noir, the name must not contain hyphens)
  - Noir: `nargo new noir`
  - Rust: `cargo new rust`
- Then make additions to the main files of each and test.
