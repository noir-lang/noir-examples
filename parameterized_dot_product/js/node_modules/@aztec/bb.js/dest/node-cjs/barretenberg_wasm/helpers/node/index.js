"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.killSelf = exports.threadLogger = exports.getNumCpu = exports.getRemoteBarretenbergWasm = exports.getSharedMemoryAvailable = void 0;
const tslib_1 = require("tslib");
const os_1 = tslib_1.__importDefault(require("os"));
const comlink_1 = require("comlink");
const node_endpoint_js_1 = require("./node_endpoint.js");
const fs_1 = require("fs");
function getSharedMemoryAvailable() {
    return true;
}
exports.getSharedMemoryAvailable = getSharedMemoryAvailable;
/**
 * Comlink allows you to produce a Proxy to the worker, enabling you to call methods as if it were a normal class.
 * Note we give it the type information it needs so the returned Proxy object looks like that type.
 * Node has a different implementation, needing this nodeEndpoint wrapper, hence this function exists here.
 */
function getRemoteBarretenbergWasm(worker) {
    return (0, comlink_1.wrap)((0, node_endpoint_js_1.nodeEndpoint)(worker));
}
exports.getRemoteBarretenbergWasm = getRemoteBarretenbergWasm;
/**
 * Returns number of cpus as reported by the system, unless overriden by HARDWARE_CONCURRENCY env var.
 */
function getNumCpu() {
    return +process.env.HARDWARE_CONCURRENCY || os_1.default.cpus().length;
}
exports.getNumCpu = getNumCpu;
/**
 * In node, the message passing is different to the browser. When using 'debug' in the browser, we seemingly always
 * get our logs, but in node it looks like it's dependent on the chain of workers from child to main thread be
 * unblocked. If one of our threads aborts, we can't see it as the parent is blocked waiting on threads to join.
 * To work around this in node, threads will by default write directly to stdout.
 */
function threadLogger() {
    return (msg) => {
        (0, fs_1.writeSync)(1, msg + '\n');
    };
}
exports.threadLogger = threadLogger;
function killSelf() {
    // Extordinarily hard process termination. Due to how parent threads block on child threads etc, even process.exit
    // doesn't seem to be able to abort the process. The following does.
    process.kill(process.pid);
    throw new Error();
}
exports.killSelf = killSelf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vaGVscGVycy9ub2RlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxvREFBb0I7QUFDcEIscUNBQStCO0FBQy9CLHlEQUFrRDtBQUNsRCwyQkFBK0I7QUFFL0IsU0FBZ0Isd0JBQXdCO0lBQ3RDLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUZELDREQUVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHlCQUF5QixDQUFJLE1BQWM7SUFDekQsT0FBTyxJQUFBLGNBQUksRUFBQyxJQUFBLCtCQUFZLEVBQUMsTUFBTSxDQUFDLENBQU0sQ0FBQztBQUN6QyxDQUFDO0FBRkQsOERBRUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLFNBQVM7SUFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQXFCLElBQUksWUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNoRSxDQUFDO0FBRkQsOEJBRUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLFlBQVk7SUFDMUIsT0FBTyxDQUFDLEdBQVcsRUFBRSxFQUFFO1FBQ3JCLElBQUEsY0FBUyxFQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELG9DQUlDO0FBRUQsU0FBZ0IsUUFBUTtJQUN0QixrSEFBa0g7SUFDbEgsb0VBQW9FO0lBQ3BFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBTEQsNEJBS0MifQ==