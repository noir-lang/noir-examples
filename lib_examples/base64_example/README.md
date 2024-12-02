# Base64 example use and bb benchmarking

This makes use of [this](https://github.com/noir-lang/noir_base64.git) base64 library (see Nargo.toml for version)

The lib covers several encode/decode tests, whereas this program has some extra code to facilitate benchmarking the gate counts of a proving backend. Comparisons can be made against other proving backends if desired.

## Test setups for gate counts

Assuming you have `nargo` and a compatible proving backend (eg nargo v0.36.0 and barretenberg bb v0.58.0):

- Choose the desired number of encode/decode runs by setting the corresponding `global` variables in src/main.nr
- Choose the input strings via the `comptime global` variables (the lengths are managed automatically at compile time)
- To ensure the test values are expected lengths:
  - `nargo test`
- Ensure these test values are in a corresponding Prover toml file eg (`Prover_SHORT.toml`)
- Execute the program referring to the prover toml file for inputs:
  - `nargo execute -p Prover_SHORT.toml`
  - Note there's an optional param that you can use to specify the name of the witness file generated
  - Optional: `nargo execute -p Prover_SHORT.toml base64_example_SHORT.gz`
- If using barretenberg, check the gate count referring to the newly created program:
  - `bb gates -b ../target/base64_example.json`
  - Note: you can similarly specify a non-default witness file to use with the program
  - Optional: `bb gates -b ../target/base64_example.json -w ../target/base64_example_SHORT`
- Repeat this for different runs of encoding and decoding, of different length inputs to collect results
  - (Automating this is left as an exercise for the reader ;)