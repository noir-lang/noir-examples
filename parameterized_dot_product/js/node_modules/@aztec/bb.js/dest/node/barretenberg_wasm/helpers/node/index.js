import os from 'os';
import { wrap } from 'comlink';
import { nodeEndpoint } from './node_endpoint.js';
import { writeSync } from 'fs';
export function getSharedMemoryAvailable() {
    return true;
}
/**
 * Comlink allows you to produce a Proxy to the worker, enabling you to call methods as if it were a normal class.
 * Note we give it the type information it needs so the returned Proxy object looks like that type.
 * Node has a different implementation, needing this nodeEndpoint wrapper, hence this function exists here.
 */
export function getRemoteBarretenbergWasm(worker) {
    return wrap(nodeEndpoint(worker));
}
/**
 * Returns number of cpus as reported by the system, unless overriden by HARDWARE_CONCURRENCY env var.
 */
export function getNumCpu() {
    return +process.env.HARDWARE_CONCURRENCY || os.cpus().length;
}
/**
 * In node, the message passing is different to the browser. When using 'debug' in the browser, we seemingly always
 * get our logs, but in node it looks like it's dependent on the chain of workers from child to main thread be
 * unblocked. If one of our threads aborts, we can't see it as the parent is blocked waiting on threads to join.
 * To work around this in node, threads will by default write directly to stdout.
 */
export function threadLogger() {
    return (msg) => {
        writeSync(1, msg + '\n');
    };
}
export function killSelf() {
    // Extordinarily hard process termination. Due to how parent threads block on child threads etc, even process.exit
    // doesn't seem to be able to abort the process. The following does.
    process.kill(process.pid);
    throw new Error();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vaGVscGVycy9ub2RlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQztBQUNwQixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRS9CLE1BQU0sVUFBVSx3QkFBd0I7SUFDdEMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx5QkFBeUIsQ0FBSSxNQUFjO0lBQ3pELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBTSxDQUFDO0FBQ3pDLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxTQUFTO0lBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFxQixJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDaEUsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLFlBQVk7SUFDMUIsT0FBTyxDQUFDLEdBQVcsRUFBRSxFQUFFO1FBQ3JCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsUUFBUTtJQUN0QixrSEFBa0g7SUFDbEgsb0VBQW9FO0lBQ3BFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUNwQixDQUFDIn0=