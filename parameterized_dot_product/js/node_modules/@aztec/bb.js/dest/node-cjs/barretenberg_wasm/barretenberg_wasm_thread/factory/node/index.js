"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThreadWorker = void 0;
const worker_threads_1 = require("worker_threads");
const path_1 = require("path");
const url_1 = require("url");
function getCurrentDir() {
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return (0, path_1.dirname)((0, url_1.fileURLToPath)(""));
    }
}
function createThreadWorker() {
    const __dirname = getCurrentDir();
    return new worker_threads_1.Worker(__dirname + `/thread.worker.js`);
}
exports.createThreadWorker = createThreadWorker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fdGhyZWFkL2ZhY3Rvcnkvbm9kZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBd0M7QUFDeEMsK0JBQStCO0FBQy9CLDZCQUFvQztBQUVwQyxTQUFTLGFBQWE7SUFDcEIsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO1NBQU0sQ0FBQztRQUNOLDZEQUE2RDtRQUM3RCxhQUFhO1FBQ2IsT0FBTyxJQUFBLGNBQU8sRUFBQyxJQUFBLG1CQUFhLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBZ0Isa0JBQWtCO0lBQ2hDLE1BQU0sU0FBUyxHQUFHLGFBQWEsRUFBRSxDQUFDO0lBQ2xDLE9BQU8sSUFBSSx1QkFBTSxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFIRCxnREFHQyJ9