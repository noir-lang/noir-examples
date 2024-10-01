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

First, from within the `noir_by_example` directory, go into the desired topic.
Eg: `cd simple_macros`

## Compiling

- `nargo compile`
- `cargo build`

## Running main

- `nargo execute`
- `cargo run`

## Running tests

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

# Adding to this repository

To add a new section:
- Go to the directory: `cd noir_by_example`
- Use the script: `./new_topic.sh topic_name`
- Then equivalent functionality to the `noir` and `rust` projects.
