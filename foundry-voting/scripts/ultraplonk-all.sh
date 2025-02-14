#!/bin/bash

# Function to handle errors
handle_error() {
  echo "❌ Error: Command failed with exit code $1"
  echo "Stopping execution..."
  exit 1
}

# Function to prompt user and wait for confirmation
prompt_step() {
  echo "⏳ Next step: $1"
  read -p "Press Enter to continue (or 'q' to quit)..." input
  if [ "$input" = "q" ]; then
    echo "Exiting script..."
    exit 0
  fi
}

# Function to execute command with status messages
execute_step() {
  local command=$1
  local description=$2

  echo "🚀 Starting: $description"
  eval $command

  if [ $? -eq 0 ]; then
    echo "✅ Success: $description completed"
    echo "----------------------------------------"
  else
    handle_error $?
  fi
}

# Main execution steps
echo "🔄 Starting build and test process..."
echo "----------------------------------------"

prompt_step "Run circuit tests"
execute_step "bun run circuits:test" "Circuit tests"

prompt_step "Execute circuits"
execute_step "bun run circuits:execute" "Circuit execution"

prompt_step "Generate UltraPlonk proof"
execute_step "bun run circuits:ultraplonk:generate-proof" "UltraPlonk proof generation"

prompt_step "Generate verification key"
execute_step "bun run circuits:ultraplonk:generate-vk" "Verification key generation"

prompt_step "Generate circuit contract"
execute_step "bun run circuits:contract" "Circuit contract generation"

prompt_step "Clean UltraPlonk proof"
execute_step "bun run ultraplonk:clean-proof" "UltraPlonk proof cleaning"

prompt_step "Run Solidity tests"
execute_step "forge test" "Forge tests"

echo "🎉 All steps completed successfully!"
