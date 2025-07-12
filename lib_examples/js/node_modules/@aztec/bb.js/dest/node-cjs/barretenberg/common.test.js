"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
describe('env', () => {
    let api;
    beforeAll(async () => {
        api = await index_js_1.Barretenberg.new({ threads: 3 });
    }, 30000);
    afterAll(async () => {
        if (api) {
            await api.destroy();
        }
    });
    it('thread test', async () => {
        // Main thread doesn't do anything in this test, so -1.
        const threads = (await api.getNumThreads()) - 1;
        const iterations = 100000;
        const result = await api.testThreads(threads, iterations);
        expect(result).toBe(iterations);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnL2NvbW1vbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQTBDO0FBRTFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO0lBQ25CLElBQUksR0FBaUIsQ0FBQztJQUV0QixTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDbkIsR0FBRyxHQUFHLE1BQU0sdUJBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFVixRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDbEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNSLE1BQU0sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDM0IsdURBQXVEO1FBQ3ZELE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQzFCLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=