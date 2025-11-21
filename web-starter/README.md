# Introduction

A simple Noir circuit with browser proving with bb.js
Has both webpack and vite bundling.

Tested with Noir 1.0.0-beta.15 and bb 3.0.0-nightly.20251104

## Setup

```bash
(cd circuits && ./build.sh)

# vite
(cd web/vite && yarn install)

# webpack
(cd web/webpack && yarn install)

# nextjs
(cd web/nextjs && yarn install)
```

## Run

```bash
# vite
(cd web/vite && yarn dev)

# webpack
(cd web/webpack && yarn build && yarn preview)

# nextjs
(cd web/nextjs && yarn build && yarn start)
```
