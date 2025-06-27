#!/usr/bin/env bash

# This script was created to make it easy to set up the environment for OpenAI Codex.
# It automates the installation and setup of all necessary dependencies for the
# noir-examples repository, including Noir, Barretenberg, Node.js packages, and Rust projects.

set -euo pipefail

# Install Noir (noirup) and Barretenberg (bbup)
echo "Installing latest Noir..."
curl -sSL https://raw.githubusercontent.com/noir-lang/noirup/refs/heads/main/install | bash
export PATH="$HOME/.nargo/bin:$PATH"
noirup

echo "Installing latest Barretenberg..."
curl -sSL https://raw.githubusercontent.com/AztecProtocol/aztec-packages/refs/heads/master/barretenberg/bbup/install | bash
export PATH="$HOME/.bbup/bin:$PATH"
bbup

echo "\n--- Compiling all Noir circuits ---"
find . -name 'Nargo.toml' | while read -r nargo_toml; do
  dir=$(dirname "$nargo_toml")
  echo "Compiling Noir circuit in $dir"
  (cd "$dir" && nargo compile || echo "Failed to compile in $dir")
done

echo "\n--- Installing Node.js dependencies ---"
find . -name 'package.json' | while read -r pkg; do
  dir=$(dirname "$pkg")
  if [ -f "$dir/package-lock.json" ] || [ -f "$dir/yarn.lock" ]; then
    echo "Installing Node.js deps in $dir"
    (cd "$dir" && (npm install || yarn install) || echo "Failed to install Node.js deps in $dir")
  else
    echo "Installing Node.js deps in $dir"
    (cd "$dir" && npm install || echo "Failed to install Node.js deps in $dir")
  fi
done

echo "\n--- Installing Rust dependencies ---"
find . -name 'Cargo.toml' | while read -r cargo; do
  dir=$(dirname "$cargo")
  echo "Building Rust project in $dir"
  (cd "$dir" && cargo build || echo "Failed to build Rust project in $dir")
done

echo "\nAll done!" 