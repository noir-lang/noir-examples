"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThreadWorker = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const thread_worker_js_1 = tslib_1.__importDefault(require("./thread.worker.js"));
function createThreadWorker() {
    const worker = new thread_worker_js_1.default();
    const debugStr = debug_1.default.disable();
    debug_1.default.enable(debugStr);
    worker.postMessage({ debug: debugStr });
    return worker;
}
exports.createThreadWorker = createThreadWorker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fdGhyZWFkL2ZhY3RvcnkvYnJvd3Nlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLGtGQUE4QztBQUU5QyxTQUFnQixrQkFBa0I7SUFDaEMsTUFBTSxNQUFNLEdBQUcsSUFBSSwwQkFBWSxFQUFFLENBQUM7SUFDbEMsTUFBTSxRQUFRLEdBQUcsZUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pDLGVBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFORCxnREFNQyJ9