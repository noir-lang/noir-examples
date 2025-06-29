# Ternary Condition — Noir vs Rust

This example demonstrates conditional logic in Noir and Rust — specifically, selecting between two values based on a boolean condition. It illustrates how ternary-like behavior (`condition ? x : y`) is written in both languages.


## 🔍 Description

Given two values `x` and `y`, and a boolean `condition`, the circuit or function returns `x` if the condition is true, and `y` otherwise.

## 📂 Files

- `src/main.nr` – Noir implementation
- `src/main.rs` – Rust equivalent
## 🧠 Purpose

- Highlights **conditional branching** based on a public input.
- Illustrates the parallel between **Noir’s `if`/`else`** and **Rust’s ternary-like behavior**.
- Useful in **zero-knowledge circuits** for selecting values without leaking control flow.

## ✅ When to Use

- When you want a **branchless selection** in circuits.
- For **simple logic choices** in Rust or ZK applications.
