/**
 * Base implementation of BarretenbergWasm.
 * Contains code that is common to the "main thread" implementation and the "child thread" implementation.
 */
export declare class BarretenbergWasmBase {
    protected memStore: {
        [key: string]: Uint8Array;
    };
    protected memory: WebAssembly.Memory;
    protected instance: WebAssembly.Instance;
    protected logger: (msg: string) => void;
    protected getImportObj(memory: WebAssembly.Memory): {
        wasi_snapshot_preview1: {
            random_get: (out: any, length: number) => void;
            clock_time_get: (a1: number, a2: number, out: number) => void;
            proc_exit: () => never;
        };
        env: {
            /**
             * The 'info' call we use for logging in C++, calls this under the hood.
             * The native code will just print to std:err (to avoid std::cout which is used for IPC).
             * Here we just emit the log line for the client to decide what to do with.
             */
            logstr: (addr: number) => void;
            get_data: (keyAddr: number, outBufAddr: number) => void;
            set_data: (keyAddr: number, dataAddr: number, dataLength: number) => void;
            memory: WebAssembly.Memory;
        };
    };
    exports(): any;
    /**
     * When returning values from the WASM, use >>> operator to convert signed representation to unsigned representation.
     */
    call(name: string, ...args: any): number;
    memSize(): number;
    /**
     * Returns a copy of the data, not a view.
     */
    getMemorySlice(start: number, end: number): Uint8Array;
    writeMemory(offset: number, arr: Uint8Array): void;
    private getMemory;
    private stringFromAddress;
}
//# sourceMappingURL=index.d.ts.map