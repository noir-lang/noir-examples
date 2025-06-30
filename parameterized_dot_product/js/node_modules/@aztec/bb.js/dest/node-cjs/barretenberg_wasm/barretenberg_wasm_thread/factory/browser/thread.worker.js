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
(0, comlink_1.expose)(new index_js_1.BarretenbergWasmThread());
self.postMessage({ ready: true });
exports.default = null;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWFkLndvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9iYXJyZXRlbmJlcmdfd2FzbS9iYXJyZXRlbmJlcmdfd2FzbV90aHJlYWQvZmFjdG9yeS9icm93c2VyL3RocmVhZC53b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWlDO0FBQ2pDLDZDQUF3RDtBQUN4RCwwREFBMEI7QUFFMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7SUFDMUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLGVBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsSUFBQSxnQkFBTSxFQUFDLElBQUksaUNBQXNCLEVBQUUsQ0FBQyxDQUFDO0FBRXJDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVsQyxrQkFBZSxJQUFXLENBQUMifQ==