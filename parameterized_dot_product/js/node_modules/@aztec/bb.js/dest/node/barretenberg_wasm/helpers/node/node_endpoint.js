export function nodeEndpoint(nep) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9lbmRwb2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9iYXJyZXRlbmJlcmdfd2FzbS9oZWxwZXJzL25vZGUvbm9kZV9lbmRwb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLFVBQVUsWUFBWSxDQUFDLEdBQWlCO0lBQzVDLE1BQU0sU0FBUyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDaEMsT0FBTztRQUNMLFdBQVcsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdEMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBTyxFQUFFLEVBQUU7WUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDdEIsSUFBSSxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7b0JBQ3hCLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO3FCQUFNLENBQUM7b0JBQ04sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDZixDQUFDO1lBQ0gsQ0FBQyxDQUFDO1lBQ0YsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELG1CQUFtQixFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQU8sRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNQLE9BQU87WUFDVCxDQUFDO1lBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQ0QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ3hDLENBQUM7QUFDSixDQUFDIn0=