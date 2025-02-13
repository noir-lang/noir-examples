#!/bin/bash

rm -rf ./target

set -e  # Exit immediately if a command exits with a non-zero status
export TIMEFORMAT="%R"

VERSIONS=("v1" "v2")
PROOF_SYSTEMS=("ultra-plonk" "ultra-honk")

# Initialize arrays to store timings
compilation_times=()
execution_times=()
proof_times=()
vk_times=()
verify_times=()
proof_system_names=()
version_names=()

for VERSION in "${VERSIONS[@]}"; do
    echo "Benchmarking PLUME $VERSION"

    echo "Compiling and executing the PLUME $VERSION circuit"

    # Compilation
    compilation_time=$( { time nargo compile --force --silence-warnings --package use_$VERSION >/dev/null; } 2>&1 )
    compilation_times+=("$compilation_time")

    # Execution
    execution_time=$( { time nargo execute --silence-warnings --package use_$VERSION use_$VERSION >/dev/null; } 2>&1 )
    execution_times+=("$execution_time")

    for PROOF_SYSTEM in "${PROOF_SYSTEMS[@]}"; do
        echo "Proving, writing the verification key, and verifying the PLUME $VERSION circuit with $PROOF_SYSTEM"

        # Set command prefixes and suffixes based on the proof system
        if [ "$PROOF_SYSTEM" == "ultra-plonk" ]; then
            PROVE_CMD="bb prove"
            VK_CMD="bb write_vk"
            VERIFY_CMD="bb verify"
            SUFFIX="_up"
            PROOF_SYSTEM_NAME="Ultra-Plonk"
        else
            PROVE_CMD="bb prove_ultra_honk"
            VK_CMD="bb write_vk_ultra_honk"
            VERIFY_CMD="bb verify_ultra_honk"
            SUFFIX="_uh"
            PROOF_SYSTEM_NAME="Ultra-Honk"
        fi

        # Define file paths
        BASE_PATH="./target/use_$VERSION"
        PROOF_PATH="./target/proof_${VERSION}${SUFFIX}"
        VK_PATH="./target/vk_${VERSION}${SUFFIX}"

        # Proof Generation
        proof_time=$( { time $PROVE_CMD -b "${BASE_PATH}.json" -w "${BASE_PATH}.gz" -o "$PROOF_PATH" >/dev/null; } 2>&1 )
        proof_times+=("$proof_time")

        # Verification Key Writing
        vk_time=$( { time $VK_CMD -b "${BASE_PATH}.json" -o "$VK_PATH" >/dev/null; } 2>&1 )
        vk_times+=("$vk_time")

        # Verification
        verify_time=$( { time $VERIFY_CMD -k "$VK_PATH" -p "$PROOF_PATH" >/dev/null; } 2>&1 )
        verify_times+=("$verify_time")

        proof_system_names+=("$PROOF_SYSTEM_NAME")
        version_names+=("$VERSION")
    done
done

# Print the summary of timings
echo
echo "Benchmarking Summary:"

array_index=0
for (( i=0; i<${#VERSIONS[@]}; i++ )); do
    VERSION="${VERSIONS[i]}"
    echo "PLUME $VERSION:"
    echo "  Compilation time: ${compilation_times[i]} seconds"
    echo "  Execution time: ${execution_times[i]} seconds"

    for (( j=0; j<${#PROOF_SYSTEMS[@]}; j++ )); do
        PROOF_SYSTEM_NAME="${proof_system_names[array_index]}"
        echo "  $PROOF_SYSTEM_NAME:"
        echo "    Proof generation time: ${proof_times[array_index]} seconds"
        echo "    Verification key writing time: ${vk_times[array_index]} seconds"
        echo "    Verification time: ${verify_times[array_index]} seconds"
        ((array_index++))
    done
    echo
done
