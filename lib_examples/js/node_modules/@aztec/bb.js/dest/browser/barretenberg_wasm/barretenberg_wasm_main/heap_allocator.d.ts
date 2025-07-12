import { type BarretenbergWasmMain } from './index.js';
/**
 * Keeps track of heap allocations so they can be easily freed.
 * The WASM memory layout has 1024 bytes of unused "scratch" space at the start (addresses 0-1023).
 * We can leverage this for IO rather than making expensive bb_malloc bb_free calls.
 * Heap allocations will be created for input/output args that don't fit into the scratch space.
 * Input and output args can use the same scratch space as it's assume all input reads will be performed before any
 * output writes are performed.
 */
export declare class HeapAllocator {
    private wasm;
    private allocs;
    private inScratchRemaining;
    private outScratchRemaining;
    constructor(wasm: BarretenbergWasmMain);
    getInputs(buffers: (Uint8Array | number)[]): number[];
    getOutputPtrs(outLens: (number | undefined)[]): number[];
    addOutputPtr(ptr: number): void;
    freeAll(): void;
}
//# sourceMappingURL=heap_allocator.d.ts.map