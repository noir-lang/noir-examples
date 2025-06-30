"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBytes = void 0;
const crypto_1 = require("crypto");
function randomBytes(len) {
    return new Uint8Array((0, crypto_1.randomBytes)(len));
}
exports.randomBytes = randomBytes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcmFuZG9tL25vZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQTBEO0FBRTFELFNBQWdCLFdBQVcsQ0FBQyxHQUFXO0lBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBQSxvQkFBaUIsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFGRCxrQ0FFQyJ9