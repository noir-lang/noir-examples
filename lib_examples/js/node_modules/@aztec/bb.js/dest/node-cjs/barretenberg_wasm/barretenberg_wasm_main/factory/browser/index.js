"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMainWorker = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const main_worker_js_1 = tslib_1.__importDefault(require("./main.worker.js"));
function createMainWorker() {
    const worker = new main_worker_js_1.default();
    const debugStr = debug_1.default.disable();
    debug_1.default.enable(debugStr);
    worker.postMessage({ debug: debugStr });
    return worker;
}
exports.createMainWorker = createMainWorker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fbWFpbi9mYWN0b3J5L2Jyb3dzZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQiw4RUFBMEM7QUFFMUMsU0FBZ0IsZ0JBQWdCO0lBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksd0JBQVUsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLGVBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQyxlQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4QyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBTkQsNENBTUMifQ==