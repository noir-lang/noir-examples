"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const comlink_1 = require("comlink");
const index_js_1 = require("../../index.js");
const node_endpoint_js_1 = require("../../../helpers/node/node_endpoint.js");
if (!worker_threads_1.parentPort) {
    throw new Error('No parentPort');
}
(0, comlink_1.expose)(new index_js_1.BarretenbergWasmThread(), (0, node_endpoint_js_1.nodeEndpoint)(worker_threads_1.parentPort));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWFkLndvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9iYXJyZXRlbmJlcmdfd2FzbS9iYXJyZXRlbmJlcmdfd2FzbV90aHJlYWQvZmFjdG9yeS9ub2RlL3RocmVhZC53b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBNEM7QUFDNUMscUNBQWlDO0FBQ2pDLDZDQUF3RDtBQUN4RCw2RUFBc0U7QUFFdEUsSUFBSSxDQUFDLDJCQUFVLEVBQUUsQ0FBQztJQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCxJQUFBLGdCQUFNLEVBQUMsSUFBSSxpQ0FBc0IsRUFBRSxFQUFFLElBQUEsK0JBQVksRUFBQywyQkFBVSxDQUFDLENBQUMsQ0FBQyJ9