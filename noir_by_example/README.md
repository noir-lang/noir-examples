# Examples showcasing syntax, libraries, and data structures

## General

These will show Noir side-by-side against [Rust by example](https://doc.rust-lang.org/rust-by-example/).

The goal is to highlight the similarities and differences in the language and design patterns.

### Tooling

You will need:

- `nargo` installed [via noirup](https://noir-lang.org/docs/getting_started/quick_start/). Tested with 1.0.0-beta.6 (`noirup -v 1.0.0-beta.6`)
- `cargo` installed [via rustup](https://www.rust-lang.org/tools/install) (optional: to see Rust output)

### What is not covered

The surrounding build artifacts (and additional proving/verifying artifacts for Noir) are not explored in this example.

## Usage

The following commands can be run at the top level `noir_by_example`, or within the specific topic directory.
Eg: `cd simple_macros`

### Compiling

- `nargo compile`
- `cargo build`

### Running main

- Noir:
  - `nargo check` # May need to populate values in Prover.toml for topics that need it
  - `nargo execute`
- Rust:
  - `cargo run` # topic-level only

### Running tests

Simply run:

- `nargo test`
- `cargo test`

To see output from `println`:

- `nargo test --show-output`
- `cargo test -- --nocapture`

To test specific functions, a substring of its name can be added to the end.
Eg, `nargo test macro`, to run tests who's name contains the string `macro`.

## Adding to this repository - GOOD FIRST ISSUES

The Noir documentation has many good pages explaining the syntax with examples, similarly with Rust.

For instance for macro function example:

- Noir example in [(Quasi) Quote](https://noir-lang.org/docs/dev/noir/concepts/comptime#lowering)
- Rust example in [macros](https://doc.rust-lang.org/rust-by-example/macros.html)

To add a new section:

- Go to the directory: `cd noir_by_example`
- Use the script: `./new_topic.sh topic_name`
- Then equivalent functionality to the `noir` and `rust` projects.
