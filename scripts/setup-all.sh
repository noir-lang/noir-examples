#!/usr/bin/env bash

# This script automates the installation and setup of all necessary dependencies
# for the noir-examples repository, including Noir, Barretenberg, Node.js packages,
# and Rust projects.
#
# Usage: ./scripts/setup-all.sh
# Make executable first: chmod +x ./scripts/setup-all.sh

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

echo ""
echo "--- Compiling all Noir circuits ---"
find . -name 'Nargo.toml' -not -path "*/node_modules/*" -not -path "*/target/*" | while read -r nargo_toml; do
  dir=$(dirname "$nargo_toml")
  # Skip workspace members - they'll be compiled by workspace root
  if grep -q "^\[workspace\]" "$nargo_toml" 2>/dev/null; then
    echo "Compiling Noir workspace in $dir"
    (cd "$dir" && nargo compile || echo "Failed to compile in $dir")
  elif ! grep -q "members" "$(dirname "$dir")/Nargo.toml" 2>/dev/null; then
    # Only compile if not a workspace member
    echo "Compiling Noir circuit in $dir"
    (cd "$dir" && nargo compile || echo "Failed to compile in $dir")
  fi
done

echo ""
echo "--- Installing Node.js dependencies ---"
find . -name 'package.json' \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -not -path "*/dist/*" \
  -not -path "*/target/*" | while read -r pkg; do
  dir=$(dirname "$pkg")
  echo "Installing Node.js deps in $dir"
  if [ -f "$dir/yarn.lock" ]; then
    (cd "$dir" && yarn install || echo "Failed to install Node.js deps in $dir")
  elif [ -f "$dir/package-lock.json" ]; then
    (cd "$dir" && npm install || echo "Failed to install Node.js deps in $dir")
  else
    # Default to npm if no lockfile exists
    (cd "$dir" && npm install || echo "Failed to install Node.js deps in $dir")
  fi
done

echo ""
echo "--- Installing Rust dependencies ---"
find . -name 'Cargo.toml' \
  -not -path "*/node_modules/*" \
  -not -path "*/target/*" | while read -r cargo; do
  dir=$(dirname "$cargo")
  echo "Building Rust project in $dir"
  (cd "$dir" && cargo build || echo "Failed to build Rust project in $dir")
done

echo ""
echo "All done!"
