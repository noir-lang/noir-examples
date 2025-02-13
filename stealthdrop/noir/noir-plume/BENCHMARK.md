# PLUME Benchmark

> Computational statistics.

## v2.0.0

_Machine_: `MacBook Pro M2 Max 32 GB RAM 1 TB Storage`

_Maximum RAM consumption_: `15 GB`

### Nightly

_Noir_: 0.38.0+0fc0c53ec183890370c69aa4148952b3123cb055

_Barrettenberg_: 0.61.0

---

| Version | Message Length | ACIR Opcodes | Brillig Opcodes | Compilation Time | Execution Time | Ultra Plonk Proof Time | Ultra Plonk VK Writing Time | Ultra Plonk Verification Time | Ultra Honk Proof Time | Ultra Honk VK Writing Time | Ultra Honk Verification Time |
|---------|----------------|--------------|-----------------|------------------|----------------|------------------------|-----------------------------|-------------------------------|-----------------------|----------------------------|------------------------------|
| v1      | 32             | 131,108      | 504,525         | 39.561 seconds   | 17.225 seconds | 10.986 seconds         | 10.692 seconds              | 0.042 seconds                | 4.693 seconds         | 3.408 seconds              | 0.049 seconds                |
| v2      | 32             | 129,980      | 504,091         | 39.495 seconds   | 17.297 seconds | 11.160 seconds         | 10.464 seconds              | 0.043 seconds                | 4.639 seconds         | 3.300 seconds              | 0.048 seconds                |
| v1      | 10,000         | 171,428      | 514,493         | 56.903 seconds   | 25.853 seconds | 41.484 seconds         | 37.037 seconds              | 0.047 seconds                | 13.253 seconds        | 9.469 seconds              | 0.048 seconds                |
| v2      | 10,000         | 170,300      | 514,059         | 57.884 seconds   | 25.965 seconds | 40.587 seconds         | 36.827 seconds              | 0.045 seconds                | 13.457 seconds        | 9.096 seconds              | 0.048 seconds                |

### Stable

_Noir_: 0.36.0+801c71880ecf8386a26737a5d8bb5b4cb164b2ab

_Barrettenberg_: 0.58.0

---

| Version | Message Length | ACIR Opcodes | Brillig Opcodes | Compilation Time | Execution Time | Ultra Plonk Proof Time | Ultra Plonk VK Writing Time | Ultra Plonk Verification Time | Ultra Honk Proof Time | Ultra Honk VK Writing Time | Ultra Honk Verification Time |
|---------|----------------|--------------|-----------------|------------------|----------------|------------------------|-----------------------------|-------------------------------|-----------------------|----------------------------|------------------------------|
| v1 | 32 | 253689 | 484059 | 100.064 seconds | 20.297 seconds | 20.463 seconds | 18.725 seconds | 0.036 seconds | 7.058 seconds | 4.701 seconds | 0.043 seconds |
| v2 | 32 | 251841 | 483707 | 62.891 seconds | 20.155 seconds | 20.109 seconds | 18.627 seconds | 0.037 seconds | 7.219 seconds | 4.380 seconds | 0.041 seconds |
| v1 | 10,000 | 311503 | 494027 | 119.118 seconds | 28.322 seconds | 41.477 seconds | 37.529 seconds | 0.040 seconds | 14.187 seconds | 9.771 seconds | 0.041 seconds |
| v2 | 10,000 | 309655 | 493675 | 83.594 seconds | 28.443 seconds | 41.999 seconds | 37.829 seconds | 0.038 seconds | 14.588 seconds | 9.760 seconds | 0.043 seconds |

## v1.0.0

_Machine_: `MacBook Pro M2 Max 32 GB RAM 1 TB Storage`

_Maximum RAM consumption_: `15 GB`

_Noir_: 0.35.0+51ae1b324cd73fdb4fe3695b5d483a44b4aff4a9

_Barrettenberg_: 0.56.0

---

| Version | Message Length | ACIR Opcodes | Brillig Opcodes | Compilation Time | Execution Time | Ultra Plonk Proof Time | Ultra Plonk VK Writing Time | Ultra Plonk Verification Time | Ultra Honk Proof Time | Ultra Honk VK Writing Time | Ultra Honk Verification Time |
|---------|----------------|--------------|-----------------|------------------|----------------|------------------------|-----------------------------|-------------------------------|-----------------------|----------------------------|------------------------------|
| v1      | 32             | 217,057      | 468,974         | 50.460 seconds   | 30.207 seconds | 10.076 seconds         | 9.385 seconds               | 0.030 seconds                 | 4.786 seconds         | 3.621 seconds              | 0.037 seconds                |
| v2      | 32             | 215,215      | 468,628         | 42.989 seconds   | 30.330 seconds | 9.673 seconds          | 9.024 seconds               | 0.029 seconds                 | 4.734 seconds         | 3.620 seconds              | 0.035 seconds                |
| v1      | 100            | 217,447      | 469,042         | 54.699 seconds   | 30.496 seconds | 9.968 seconds          | 9.598 seconds               | 0.031 seconds                 | 4.791 seconds         | 3.769 seconds              | 0.038 seconds                |
| v2      | 100            | 215,605      | 468,696         | 45.778 seconds   | 30.393 seconds | 10.110 seconds         | 9.519 seconds               | 0.029 seconds                 | 4.795 seconds         | 3.723 seconds              | 0.038 seconds                |
| v1      | 10,000         | 274,871      | 478,942         | 73.138 seconds   | 38.606 seconds | 35.419 seconds         | 33.338 seconds              | 0.033 seconds                 | 13.728 seconds        | 11.027 seconds             | 0.039 seconds                |
| v2      | 10,000         | 273,029      | 478,596         | 65.427 seconds   | 39.092 seconds | 35.247 seconds         | 33.148 seconds              | 0.029 seconds                 | 14.097 seconds        | 11.159 seconds             | 0.036 seconds                |

## v0.1.2

_Machine_: `20 Cores, 300 GB RAM`

_Maximum RAM consumption_: `200 GB`

_Noir_: 0.35.0+51ae1b324cd73fdb4fe3695b5d483a44b4aff4a9

_Barrettenberg_: 0.56.0

---

| Version | Message Length | Constraints | Execution Time | Proving Ultra Plonk Time | Writing VK Ultra Plonk Time | Verifying Ultra Plonk Time | Proving Ultra Honk Time | Writing Vk Ultra Honk Time | Verifying Ultra Honk Time |
|---------|----------------|-------------|--------------------|--------------------|--------------------|----------------|-------------------------|----------------------------|---------------------------|
| v1      | 32             | 696,838   | 54 minutes 36 seconds | 2 minutes 18 seconds | 2 minutes 6 seconds | 0.07 seconds | 1 minute 2 seconds | 53 seconds | 0.1 seconds |
| v2      | 32             | 696,184   | 54 minutes 50 seconds | 2 minutes 13 seconds | 2 minutes 2 seconds | 0.07 seconds   | 1 minute 5 seconds | 53 seconds | 0.09 seconds |
| v1      | 100            | 697,228   | 55 minutes 26 seconds | 2 minutes 23 seconds | 2 minutes 6 seconds | 0.07 seconds   | 1 minute 2 seconds | 53 seconds | 0.1 seconds |
| v2      | 100            | 696,574   | 55 minutes 30 seconds | 2 minutes 20 seconds | 2 minutes 6 seconds | 0.08 seconds   | 1 minute 8 seconds | 52 seconds | 0.08 seconds |
| v1      | 10000          | 754,652   | 56 minutes 22 seconds | 2 minutes 27 seconds | 2 minutes 19 seconds | 0.12 seconds  | 1 minute 16 seconds | 1 minute 2 seconds | 0.08 seconds |
| v2      | 10000          | 753,998   | 56 minutes 16 seconds | 2 minutes 25 seconds | 2 minutes 20 seconds | 0.07 seconds  | 1 minute 12 seconds | 1 minute 3 seconds | 0.08 seconds |

## v0.1.0

_Machine_: `20 Cores, 144 GB RAM`

_Maximum RAM consumption_: `123 GB`

Ultra Plonk:

1. _Noir_: 0.32.0

2. _Barrettenberg_: 0.46.1

Ultra Honk:

1. _Noir_: 0.33.0

2. _Barrettenberg_: 0.47.1

---

| Version | Message Length | Constraints | Execution Time       | Proving Ultra Plonk Time | Writing VK Ultra Plonk Time | Verifying Ultra Plonk Time | Proving Ultra Honk Time | Writing VK Ultra Honk Time | Verifying Ultra Honk Time |
|---------|----------------|-------------|----------------------|--------------------------|-----------------------------|----------------------------|-------------------------|----------------------------|---------------------------|
| v1      | 5              | 2,998,712   | 15 minutes 59 seconds | 53 minutes 15 seconds     | 37 minutes 19 seconds        | 0.1 seconds                | 13 minutes 23 seconds    | 12 minutes 3 seconds       | 0.06 seconds              |
| v2      | 5              | 2,998,520   | 18 minutes 32 seconds | 58 minutes 42 seconds     | 36 minutes 25 seconds        | 0.1 seconds                | 13 minutes 9 seconds     | 12 minutes 14 seconds      | 0.06 seconds              |
| v1      | 32             | 2,998,905   | 17 minutes 34 seconds | 53 minutes 38 seconds     | 36 minutes 43 seconds        | 0.11 seconds               | 13 minutes 3 seconds     | 11 minutes 44 seconds      | 0.06 seconds              |
| v2      | 32             | 2,998,636   | 17 minutes 9 seconds  | 50 minutes 17 seconds     | 38 minutes 59 seconds        | 0.14 seconds               | 12 minutes 55 seconds    | 11 minutes 48 seconds      | 0.06 seconds              |
| v1      | 100            | 2,999,162   | 16 minutes 49 seconds | 24 minutes 9 seconds      | 22 minutes 58 seconds        | 0.06 seconds               | 13 minutes 4 seconds     | 12 minutes 30 seconds      | 0.06 seconds              |
| v2      | 100            | 2,998,893   | 16 minutes 28 seconds | 30 minutes 11 seconds     | 25 minutes 14 seconds        | 0.07 seconds               | 12 minutes 57 seconds    | 12 minutes 2 seconds       | 0.06 seconds              |
| v1      | 10,000         | 3,036,441   | 23 minutes 55 seconds | 38 minutes 18 seconds     | 32 minutes 19 seconds        | 0.08 seconds               | 13 minutes 35 seconds    | 12 minutes 13 seconds      | 0.06 seconds              |
| v2      | 10,000         | 3,036,172   | 17 minutes 47 seconds | 28 minutes 46 seconds     | 30 minutes 40 seconds        | 0.07 seconds               | 13 minutes 59 seconds    | 12 minutes 25 seconds      | 0.06 seconds              |
