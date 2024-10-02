#!/bin/bash
echo "This command is for creating a subdirectory for a new topic."

# Only run from location of script
script_dir="$(cd "$(dirname "$0")" && pwd)"
current_dir="$(pwd)"

if [ "$script_dir" != "$current_dir" ]; then
    echo "Error: Script intended to be run from its directory (noir_by_example)"
    exit 1
fi

if [ $# -eq 0 ]; then
    echo "Error: Please provide a topic_name as an argument."
    exit 1
fi

# Create topic dir from command line argument
dir_name="$1"
mkdir -p "$dir_name"

if [ $? -eq 0 ]; then
    echo "Directory '$dir_name' created (or already exists)."
    cd "$dir_name"

    echo "Creating Noir project..."
    nargo new noir
    if [ $? -ne 0 ]; then
        echo "Error: Failed to create new Noir project."
        exit 1
    fi

    echo "Creating Rust ..."
    cargo new rust
    if [ $? -ne 0 ]; then
        echo "Error: Failed to create new Rust project."
        exit 1
    fi

else
    echo "Error: Failed to create directory '$dir_name'."
    exit 1
fi

cd ..
