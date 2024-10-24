#!/bin/bash

file_prefix="$1"
echo "Usage: $0 [file prefix]"
echo "Versions of $file_prefix*.toml files"

find . -iname "$file_prefix*.toml" | while read -r file; do
    echo "$file:"  # Print the full path of the file
    grep "version" "$file"
done