#!/bin/bash

cd circuits
# Check if target directory exists, create if it doesn't
if [ ! -d "./target" ]; then
  mkdir -p "./target"
fi

# Check if source proof file exists
if [ ! -f "./target/proof" ]; then
  echo "Error: Source file ./target/proof not found"
  exit 1
fi

# Process the proof file and write to clean-proof
# Number of character to tail is counted with formula, 32 * NUMBER_OF_PUBLIC_INPUTS + 1
# Number of public inputs also includes return values, that's why we have 4 public input for our circuit.

tail -c +129 ./target/proof | od -An -v -t x1 | tr -d $' \n' >./target/clean-proof

# Check if the command was successful
if [ $? -eq 0 ]; then
  echo "Successfully processed proof file"
  exit 0
else
  echo "Error: Failed to process proof file"
  exit 1
fi
