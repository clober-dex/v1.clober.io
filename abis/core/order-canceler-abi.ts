export const ORDER_CANCELER_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'market',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'tokenIds',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct CloberOrderCanceler.CancelParams[]',
        name: 'paramsList',
        type: 'tuple[]',
      },
    ],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'market',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'tokenIds',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct CloberOrderCanceler.CancelParams[]',
        name: 'paramsList',
        type: 'tuple[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'cancelTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
