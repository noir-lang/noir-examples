"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const comlink_1 = require("comlink");
const index_js_1 = require("../../index.js");
const debug_1 = tslib_1.__importDefault(require("debug"));
self.onmessage = function (e) {
    if (e.data.debug) {
        debug_1.default.enable(e.data.debug);
    }
};
(0, comlink_1.expose)(new index_js_1.BarretenbergWasmMain());
self.postMessage({ ready: true });
exports.default = null;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi53b3JrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fbWFpbi9mYWN0b3J5L2Jyb3dzZXIvbWFpbi53b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWlDO0FBQ2pDLDZDQUFzRDtBQUN0RCwwREFBMEI7QUFFMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7SUFDMUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLGVBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsSUFBQSxnQkFBTSxFQUFDLElBQUksK0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0FBRW5DLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVsQyxrQkFBZSxJQUFXLENBQUMifQ==