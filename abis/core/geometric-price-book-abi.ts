export const GEOMETRIC_PRICE_BOOK_ABI = [
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'a_',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'r_',
        type: 'uint128',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'errorCode',
        type: 'uint256',
      },
    ],
    name: 'CloberError',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'priceIndex',
        type: 'uint16',
      },
    ],
    name: 'indexToPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxPriceIndex',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'roundingUp',
        type: 'bool',
      },
    ],
    name: 'priceToIndex',
    outputs: [
      {
        internalType: 'uint16',
        name: 'index',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'correctedPrice',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'priceUpperBound',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
