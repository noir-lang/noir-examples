"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeEndpoint = void 0;
function nodeEndpoint(nep) {
    const listeners = new WeakMap();
    return {
        postMessage: nep.postMessage.bind(nep),
        addEventListener: (_, eh) => {
            const l = (data) => {
                if ('handleEvent' in eh) {
                    eh.handleEvent({ data });
                }
                else {
                    eh({ data });
                }
            };
            nep.on('message', l);
            listeners.set(eh, l);
        },
        removeEventListener: (_, eh) => {
            const l = listeners.get(eh);
            if (!l) {
                return;
            }
            nep.off('message', l);
            listeners.delete(eh);
        },
        start: nep.start && nep.start.bind(nep),
    };
}
exports.nodeEndpoint = nodeEndpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9lbmRwb2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9iYXJyZXRlbmJlcmdfd2FzbS9oZWxwZXJzL25vZGUvbm9kZV9lbmRwb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixZQUFZLENBQUMsR0FBaUI7SUFDNUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUNoQyxPQUFPO1FBQ0wsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN0QyxnQkFBZ0IsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFPLEVBQUUsRUFBRTtZQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUN0QixJQUFJLGFBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztvQkFDeEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzNCLENBQUM7cUJBQU0sQ0FBQztvQkFDTixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNmLENBQUM7WUFDSCxDQUFDLENBQUM7WUFDRixHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQ0QsbUJBQW1CLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBTyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ1AsT0FBTztZQUNULENBQUM7WUFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDeEMsQ0FBQztBQUNKLENBQUM7QUF6QkQsb0NBeUJDIn0=