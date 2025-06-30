/// <reference types="node" resolution-mode="require"/>
import { Worker } from 'worker_threads';
export declare function getSharedMemoryAvailable(): boolean;
/**
 * Comlink allows you to produce a Proxy to the worker, enabling you to call methods as if it were a normal class.
 * Note we give it the type information it needs so the returned Proxy object looks like that type.
 * Node has a different implementation, needing this nodeEndpoint wrapper, hence this function exists here.
 */
export declare function getRemoteBarretenbergWasm<T>(worker: Worker): T;
/**
 * Returns number of cpus as reported by the system, unless overriden by HARDWARE_CONCURRENCY env var.
 */
export declare function getNumCpu(): number;
/**
 * In node, the message passing is different to the browser. When using 'debug' in the browser, we seemingly always
 * get our logs, but in node it looks like it's dependent on the chain of workers from child to main thread be
 * unblocked. If one of our threads aborts, we can't see it as the parent is blocked waiting on threads to join.
 * To work around this in node, threads will by default write directly to stdout.
 */
export declare function threadLogger(): ((msg: string) => void) | undefined;
export declare function killSelf(): never;
//# sourceMappingURL=index.d.ts.map