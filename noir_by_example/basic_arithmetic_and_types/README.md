# Basic Arithmetic and Types

This example compares how Noir and Rust handle:

- Basic math operations (`+`, `*`)
- Boolean values (`sum > 0`)
- Data types (`Field` in Noir vs `u32` in Rust)

### Noir

- `Field`: finite field element
- `pub Field`: public input
- Arithmetic and asserts are constraint-checked

### Rust

- `u32`, `bool`: primitive types
- Runtime arithmetic and conditionals

### To Run

#### Noir
```bash
cd noir
nargo check
nargo test --show-output
nargo execute
```

### Rust
```bash
cd rust
cargo run
```