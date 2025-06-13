# Noir Recursion Example

E2E example of generating a recursive proof using Noir and bb.js.

- Circuits in `circuits/` directory
- JS code in `js/generate-proof.ts`

### Version used

```
Noir 1.0.0-beta.6
bb 0.84.0
```

### Steps

1. Compile the circuits

```bash
(cd circuits && ./build.sh)
```

2. Generate inner and recursive proof, and verify the recursive proof

```bash
(cd js && yarn install)
(cd js && yarn generate-proof)
```
