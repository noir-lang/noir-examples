import { NodeEndpoint } from 'comlink/dist/esm/node-adapter.js';
export declare function nodeEndpoint(nep: NodeEndpoint): {
    postMessage: (message: any, transfer?: any[] | undefined) => void;
    addEventListener: (_: any, eh: any) => void;
    removeEventListener: (_: any, eh: any) => void;
    start: (() => void) | undefined;
};
//# sourceMappingURL=node_endpoint.d.ts.map