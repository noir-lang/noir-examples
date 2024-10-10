#!/bin/bash

file_prefix="$1"

find . -iname "$1*.toml" | while read -r file; do
    echo "$file:"  # Print the full path of the file
    grep "version" "$file"
done