# `threshold_comparison` – Noir vs Rust

## 🧠 Purpose

This example demonstrates conditional logic in a privacy-preserving circuit, showing how to check whether a secret input meets a public threshold and return a public signal.

It highlights:

- How private inputs can be compared to public thresholds without leaking information.
- How to perform similar logic in Rust for testing or client-side logic.

## ✅ When to Use

- When designing threshold checks in zero-knowledge applications (e.g., age verification, credit checks, score thresholds).
- When you want to publicly reveal a boolean outcome (`flag`) without leaking private data like the input value.
