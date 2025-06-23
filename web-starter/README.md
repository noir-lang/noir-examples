# Introduction

A simple Noir circuit with browser proving with bb.js
Has both webpack and vite bundling.

Tested with Noir 1.0.0-beta.6 and bb 0.84.0

## Setup

```bash
(cd circuits && ./build.sh)

# vite
(cd web/vite && yarn install)

# webpack
(cd web/webpack && yarn install)
```

## Run

```bash
# vite
(cd web/vite && yarn dev)

# webpack
(cd web/webpack && yarn dev)
```
