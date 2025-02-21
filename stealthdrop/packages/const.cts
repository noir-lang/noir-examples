export const MESSAGE_TO_HASH = 'signThis';

export const abi = [
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'proof',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 'nullifier_x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'nullifier_y',
        type: 'bytes32',
      },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
