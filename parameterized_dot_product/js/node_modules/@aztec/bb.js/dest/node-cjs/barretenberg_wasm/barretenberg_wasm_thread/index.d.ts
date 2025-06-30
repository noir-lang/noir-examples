import { Remote } from 'comlink';
import { BarretenbergWasmBase } from '../barretenberg_wasm_base/index.js';
export declare class BarretenbergWasmThread extends BarretenbergWasmBase {
    /**
     * Init as worker thread.
     */
    initThread(module: WebAssembly.Module, memory: WebAssembly.Memory): Promise<void>;
    destroy(): void;
    protected getImportObj(memory: WebAssembly.Memory): {
        wasi: {
            'thread-spawn': () => never;
        };
        env: {
            env_hardware_concurrency: () => number;
            logstr: (addr: number) => void;
            get_data: (keyAddr: number, outBufAddr: number) => void;
            set_data: (keyAddr: number, dataAddr: number, dataLength: number) => void;
            memory: WebAssembly.Memory;
        };
        wasi_snapshot_preview1: {
            random_get: (out: any, length: number) => void;
            clock_time_get: (a1: number, a2: number, out: number) => void;
            proc_exit: () => never;
        };
    };
}
export type BarretenbergWasmThreadWorker = Remote<BarretenbergWasmThread>;
//# sourceMappingURL=index.d.ts.map